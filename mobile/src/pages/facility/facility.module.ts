import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacilityPage } from './facility';
import { ProgressBarComponent } from '../../components/progress-bar/progress-bar';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FilterByIdPipe } from '../../pipes/filter-by-id/filter-by-id';
import { AutosizeTextAreaComponent } from '../../components/autosize-text-area/autosize-text-area';
import { HideHeaderDirective } from '../../directives/hide-header/hide-header';
@NgModule({
  declarations: [
    // FacilityPage,
    // ProgressBarComponent,
    // FilterByIdPipe,
    AutosizeTextAreaComponent,
    // HideHeaderDirective
  ],
  imports: [
    IonicPageModule.forChild(FacilityPage),
    Ng2OrderModule

  ],
  exports: [
    // FacilityPage,
    // ProgressBarComponent,
    Ng2OrderModule,
    // FilterByIdPipe
  ]
})
export class FacilityPageModule {}
