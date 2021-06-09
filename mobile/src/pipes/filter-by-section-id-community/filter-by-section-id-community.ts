import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterBySectionIdCommunityPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
	name: 'myfilter',
	pure: false
})
export class FilterBySectionIdCommunityPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
	transform(items: any, typeId: number): any {
		// filter items array, items which match and return true will be kept, false will be filtered out
		if (items.length == 0) {
			return;
		}
		return items.filter((item) => {
			return item.sectionType === typeId;
		});
	}
}
