import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommunityPage } from './community';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { CommunityProgressBarComponent } from '../../components/community-progress-bar/community-progress-bar';
import { AutosizeTextAreaCommunityComponent } from '../../components/autosize-text-area-community/autosize-text-area-community';
import { FilterBySectionIdCommunityPipe } from '../../pipes/filter-by-section-id-community/filter-by-section-id-community';
import { HideHeaderCommunityDirective } from '../../directives/hide-header-community/hide-header-community';
@NgModule({
  declarations: [
    // CommunityPage,
    // CommunityProgressBarComponent,
    AutosizeTextAreaCommunityComponent,
    // FilterBySectionIdCommunityPipe,
    // HideHeaderCommunityDirective
  ],
  imports: [
    IonicPageModule.forChild(CommunityPage),
    Ng2OrderModule
  ],
  exports: [
    // CommunityPage,
    // CommunityProgressBarComponent,
    Ng2OrderModule
  ]
})
export class CommunityPageModule {}
