import { ElementRef, HostListener, Directive, OnInit } from '@angular/core';

/**
 * Generated class for the AutosizeTextAreaComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Directive({
	selector: 'ion-textarea[autosize]'
})
export class AutosizeTextAreaComponent {

	@HostListener('input', ['$event.target'])
	onInput(textArea: HTMLTextAreaElement): void {
		this.adjust();
	}

	constructor(public element: ElementRef) {
	}

	ngOnInit(): void {
		setTimeout(() => this.adjust(), 0);
	}

	adjust(): void {
		let ta = this.element.nativeElement.querySelector("textarea");
		ta.style.overflow = "hidden";
		ta.style.height = "auto";
		ta.style.height = ta.scrollHeight + "px";
	}

}
