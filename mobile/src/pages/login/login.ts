/*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Date: 2017-10-14 11:45:35 
 * @Last Modified by: Ratikanta Pradhan
 * @Last Modified time: 2018-01-05 17:53:12
 */

import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, Events, Platform} from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { DataProvider } from '../../providers/data/data';
import { MessageProvider } from '../../providers/message/message';
import { HomePage } from '../home/home';
import { EssProvider } from '../../providers/ess/ess'

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  

  obj : any;
  is_web : boolean = false;
  appVersionName: string;

  /**
   * @Author: Ratikanta Pradhan
   * @param navCtrl 
   * @param dataService 
   * @param messageService 
   * @param events 
   * @param menu 
   * @param confirmAlert 
   * @param http 
   * @param platform 
   */
  
  
  constructor(private navCtrl: NavController, 
      private dataService: DataProvider, 
      private messageService: MessageProvider, 
      private events: Events,
      private menu : MenuController,
      private confirmAlert : AlertController,
      private http : Http,
    private platform: Platform,
    private ess: EssProvider) {


      this.platform.ready().then(_=>{
        if(this.platform.is('android') && this.platform.is('cordova')){
          this.messageService.check_storage_capacity()
        }
      })
        

      this.obj = {
        username : "",
        password : ""
      }          
      
     this.is_web = this.ess.getPlatform().isWebPWA
     this.appVersionName = this.ess.getAppVersionName()
      
      
  }

  ionViewDidLoad() {
    
    //Turning off side menu
    this.menu.enable(false);
    this.menu.swipeEnable(false);
    this.menu.get().enable(false);

    

  }

  
  /*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by:   Ratikanta Pradhan 
 * @Last Modified time: 12-10-2017 18:10
 */
  ngOnInit():void {

    //Listen to Event
    this.events.subscribe(MessageProvider.EVENTS.LOGIN_EVENT, 
      (data, isNewUser ,message) => {
      if(isNewUser){
        this.showConfirm(MessageProvider.MESSAGES.NEW_USER_OR_FORGOT_PASSWORD);
      }else{
        if(data){
          let temp_this = this
              this.events.publish(MessageProvider.EVENTS.SIDE_MENU_DATA, true);
              this.dataService.setMasterData();              
              this.dataService.setIsLoggedIn(true)
              .then((data)=>{
                temp_this.navCtrl.setRoot(HomePage)
              })
              .catch(err=>{
                temp_this.messageService.showErrorAlert(err)
              })
              
        }else{
          this.errorToast(message);
        }        
      } 
    });
  }
_runScript(event:any){
  if(event.keyCode == 13){
    this.login ();
  }
}


/**
 * This method will login to server
 */
  login (){
    this.dataService.validateUser(this.obj);
  }
  
  

  /**
   *  Confirmation modal
   */
  showConfirm(msg ) {
    let confirm = this.confirmAlert.create({
      enableBackdropDismiss:false,
      title: 'Info',
      message: msg,
      buttons: [
        {
          text: 'No',
            handler: () => {
        }
        },
        {
         text: 'Yes',
          handler: () => {
            this.dataService.getUserFromServer(true);
          }
        }
      ]
    });
    confirm.setCssClass('sectorSelectionModalCommunity');
    confirm.present();
  }
  emailValidation(valueObj) {
    var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (valueObj != null || valueObj != "") {
        if (!EMAIL_REGEXP.test(valueObj)) {
         return true;
        } else {
          return false;
        }
    }
  }
  forgotPassword(){
    let prompt = this.confirmAlert.create({
      enableBackdropDismiss:false,
      title: 'Forgot Password',
      message: "Enter your registered email to reset your password",
      cssClass:'fpModal',
      inputs: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            data.email.trim();
            if(data.email == "" || this.emailValidation(data.email)){
              this.warningToast("Please enter a valid email");
              data.email = null;
            }else{
              this.sendRequestForgotPassword(data.email);
            }
          }
        }
      ]
    });
    prompt.present();
  }

  sendRequestForgotPassword(email){
    
    try{
      // if(this.messageService.checkInternet()){
      this.messageService.presentLoading("Contacting server, please wait...");
      this.http.get(MessageProvider.checkInternetURL)
      .timeout(MessageProvider.LOGIN_TIME_OUT)
      .subscribe(data => {
          let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          this.http.post(MessageProvider.server+"forgotPassword", JSON.stringify(email), {headers : headers})
          .map(res => res.json())
          .timeout(MessageProvider.LOGIN_TIME_OUT)
          .subscribe(data => {
            this.messageService.dismissLoading();
            if(data.hasError){
              this.errorToast(data.message);
            }else{
              this.warningToast("The reset password link is successfully sent to your email.");
            }
          }, err => {
              this.messageService.dismissLoading();
              this.errorToast("Unable to process the request, please try again later.");
          });
      },err => {
        this.messageService.dismissLoading();
        this.errorToast(MessageProvider.MESSAGES.INTERNET_CHECK);
      });  
    }catch(err){
      console.log(err);
      this.messageService.dismissLoading();
      this.errorToast("Error "+ err);
    }
  }

warningToast(message) {
  
  let confirm = this.confirmAlert.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalCommunity');
        confirm.setTitle("Info");
        confirm.setMessage(message);
        confirm.addButton({
          text: "Ok",
          handler: data => {
            confirm.dismiss;
          }
        });
        confirm.present();
  }
  errorToast(message) {
  
  let confirm = this.confirmAlert.create({enableBackdropDismiss:false});
        confirm.setCssClass('sectorSelectionModalCommunity');
        confirm.setTitle("Error");
        confirm.setMessage(message);
        confirm.addButton({
          text: "Ok",
          handler: data => {
            confirm.dismiss;
          }
        });
        confirm.present();
  }

/*
 * @Author: Ratikanta Pradhan 
 * @email:   ratikanta@sdrc.co.in 
 * @Last Modified by:   Ratikanta Pradhan 
 * @Last Modified time: 2017-09-27 17:58:59 
 */
ngOnDestroy(): void{
  this.events.unsubscribe(MessageProvider.EVENTS.LOGIN_EVENT);
  this.events.unsubscribe(MessageProvider.EVENTS.STORAGE_TEST_DONE);
}



}
