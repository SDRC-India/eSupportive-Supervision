import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the AreaPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'area',
})
export class AreaPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: any, ...args) {
    if(args[0].type == undefined){
      return value.filter(d=>d.level === args[0].level && d.parentAreaId === args[0].parentAreaId);
    }else{
      return value.filter(d=>d.id === parseInt(args[0].id))[0].name;
    }
  }

  convertToParentChild(array : any){
    var map = {};
	    for(var i = 0; i < array.length; i++){
	        var obj = array[i];
	        if(obj.parentAreaId == -1)
	        	obj.parentAreaId =  null;
	        if(!(obj.areaNId in map)){
	            map[obj.areaNId] = obj;
	            map[obj.areaNId].children = [];
	        }

	        if(typeof map[obj.areaNId].name == 'undefined'){
	            map[obj.areaNId].areaNId = String(obj.areaNId);
	            map[obj.areaNId].name = obj.name;
	            map[obj.areaNId].parentAreaId = String(obj.parentAreaId);
	        }

	        var parent = obj.parentAreaId || '-';
	        if(!(parent in map)){
	            map[parent] = {};
	            map[parent].children = [];
	        }

	        map[parent].children.push(map[obj.areaNId]);
	    }
	    return map['-'];
  }

}
