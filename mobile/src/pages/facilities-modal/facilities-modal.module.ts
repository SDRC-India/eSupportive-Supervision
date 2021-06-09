import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilitiesModalPage } from './facilities-modal';
import { Ng2OrderModule } from 'ng2-order-pipe';

@NgModule({
  declarations: [
    // FacilitiesModalPage,
  ],
  imports: [
    IonicPageModule.forChild(FacilitiesModalPage),Ng2OrderModule
  ],
  exports: [
    // FacilitiesModalPage,
    Ng2OrderModule
  ]
})
export class FacilitiesModalPageModule {}
