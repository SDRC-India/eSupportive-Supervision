import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HintModalPage } from './hint-modal';

@NgModule({
  declarations: [
    // HintModalPage,
  ],
  imports: [
    IonicPageModule.forChild(HintModalPage),
  ],
  exports: [
    // HintModalPage
  ]
})
export class HintModalPageModule {}
