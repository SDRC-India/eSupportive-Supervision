import { EssProvider } from './../../providers/ess/ess';
import { Directive, Input, ElementRef, Renderer, HostListener} from '@angular/core';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the HideHeaderCommunityDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[hide-header]', // Attribute selector
})
export class HideHeaderCommunityDirective {
  headerhieght: any;
  scrollContent: any;
  @Input("header") header : HTMLElement;
  constructor(public elementRef:ElementRef,
     public renderer:Renderer,
     private platform : Platform,
    private essService: EssProvider ) {
    
  }
  ngOnInit(){
    this.headerhieght = this.header.clientHeight;
   
    this.renderer.setElementStyle(this.header,'webkitTransition','top 700ms');
    this.scrollContent = this.elementRef.nativeElement.getElementsByClassName("scroll-content")[0];
    this.renderer.setElementStyle(this.scrollContent,'webkitTransition','top 700ms');
  }
  @HostListener('focusin', ['$event.target'])
  onFocus(target) {
    if(!this.essService.getPlatform().isWebPWA){
      if(target.classList[0]=="text-input"){
        this.renderer.setElementStyle(this.header,'top','-'+this.header.clientHeight+'px');
        if(this.header.clientHeight > 136){
          this.renderer.setElementStyle(this.scrollContent,'margin-top','-55px');
        }else{
          this.renderer.setElementStyle(this.scrollContent,'margin-top','0px');
        }
      }
    }
    
  }
  @HostListener('focusout', ['$event.target'])
  onFocusout(target) {
    if(!this.essService.getPlatform().isWebPWA){
      if(target.classList[0]=="text-input"){
        console.log(this.header.clientHeight)
        this.renderer.setElementStyle(this.header,'top','0px');
        this.renderer.setElementStyle(this.scrollContent,'margin-top','136px');
      }
    }
    
  }
}
