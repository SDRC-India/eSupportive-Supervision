import { EssProvider } from './../../providers/ess/ess';
import { Component,ViewChild } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the SignatureModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-signature-modal',
  templateUrl: 'signature-modal.html',
})
export class SignatureModalPage {

   @ViewChild(SignaturePad) signaturePad: SignaturePad;
   signature = null;
   isDrawing = false;
   type = this.navParams.get('type');

   private signaturePadOptions: Object 

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController,private alertCtrl: AlertController,
    private messageProvider : MessageProvider,
  private essService : EssProvider) {
  }

  ngOnInit(){
    this.signaturePadOptions = { // Check out https://github.com/szimek/signature_pad
      'minWidth': 2,
      'canvasWidth': this.essService.getPlatform().isWebPWA ? window.innerWidth - 450 : window.innerWidth - 60,
      'canvasHeight': this.essService.getPlatform().isWebPWA ? window.innerHeight - 300 : window.innerHeight - 200,
      'backgroundColor': '#e6f4ff',
      // '#f6fbff'
      'penColor': '#666a73'
     };
  }

  ionViewDidLoad() {    
    // console.log(window);
    // console.log('ionViewDidLoad SignatureModalPage');
    MessageProvider.MODAL_ALERTS.SIGNATURE = true;
  }

  ionViewDidEnter() {  
    if(this.signaturePad)
      this.signaturePad.clear()
  }
 
  drawComplete() {    
    this.isDrawing = true;
  }
 
  drawStart() {    
    this.isDrawing = false;
  }
 
  savePad() {
       
        if(this.isDrawing){
            this.signature = this.signaturePad.toDataURL();
        }else{
          this.signature = null;
        }
        
        this.closeModal();
        // this.warningToast("Signature captured successfully");
  }
 
  clearPad() {
    this.isDrawing = false;
        if(this.signaturePad)
          this.signaturePad.clear();
  }

  closeModal() {
    MessageProvider.MODAL_ALERTS.SIGNATURE = false;
    let obj = { type : this.type, signature : this.signature};
    this.viewCtrl.dismiss(obj);
  }

  warningToast(message) {
  
  let confirm = this.alertCtrl.create({enableBackdropDismiss:false});
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

}
