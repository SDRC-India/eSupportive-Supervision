import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController, Events } from 'ionic-angular';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the HintModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hint-modal',
  templateUrl: 'hint-modal.html',
})
export class HintModalPage {

  hintObject:any;
  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public vc:ViewController, private events : Events) {
    this.hintObject=this.navParams.data;
  }

  /**
   * @author Jagat Bandhu Sahoo
   */
  ngOnInit():void {
    this.events.subscribe(MessageProvider.EVENTS.DISSMISS_MODAL_FACILITY,() => {
      MessageProvider.MODAL_ALERTS.HELP = false;
      this.vc.dismiss();
    });
    this.events.subscribe(MessageProvider.EVENTS.DISSMISS_MODAL_COMMUNITY,() => {
      MessageProvider.MODAL_ALERTS.HELP = false;
      this.vc.dismiss();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HintModalPage');
    MessageProvider.MODAL_ALERTS.HELP = true;
  }

  close(){
    MessageProvider.MODAL_ALERTS.HELP = false;
    this.vc.dismiss();
  }

  /**
   * @author Jagat Bandhu Sahoo
   */
  ngOnDestroy():void {
    this.events.unsubscribe(MessageProvider.EVENTS.DISSMISS_MODAL_FACILITY);
    this.events.unsubscribe(MessageProvider.EVENTS.DISSMISS_MODAL_COMMUNITY);
  }

}
