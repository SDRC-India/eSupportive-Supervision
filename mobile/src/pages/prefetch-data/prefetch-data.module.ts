import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PrefetchDataPage } from './prefetch-data';

@NgModule({
  declarations: [
    // PrefetchDataPage,
  ],
  imports: [
    IonicPageModule.forChild(PrefetchDataPage),
  ],
  exports: [
    // PrefetchDataPage
  ]
})
export class PrefetchDataPageModule {}
