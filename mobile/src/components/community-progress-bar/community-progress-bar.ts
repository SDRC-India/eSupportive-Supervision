import { Component, Input } from '@angular/core';

@Component({
  selector: 'community-progress-bar',
  templateUrl: 'community-progress-bar.html'
})
export class CommunityProgressBarComponent {

  @Input('progress') progress;
  constructor() {
    
  }

}
