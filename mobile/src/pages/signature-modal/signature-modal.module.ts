import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignatureModalPage } from './signature-modal';

@NgModule({
  declarations: [
    // SignatureModalPage,
  ],
  imports: [
    SignaturePadModule,
    IonicPageModule.forChild(SignatureModalPage)
  ],
  exports: [
    SignaturePadModule,
    // SignatureModalPage
  ]
})
export class SignatureModalPageModule {}
