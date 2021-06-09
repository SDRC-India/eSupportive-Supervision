import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FacilitylevelPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'facilitylevel',
})
export class FacilitylevelPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(data: any, ...args) {

    let returnArray = [];
    let indexes = [];

    for(let i = 0; i < data.length;i++){
      let smallerValue = this.getSmallerValue(data, indexes);    
      let index = this.getIndex(data, smallerValue);
      indexes.push(index);
    }
    
    for(let i = 0; i < data.length;i++){
      returnArray.push(data[indexes[i]]);
    }    

    return returnArray




  }

  getIndex(data, value){
    for(let i = 0; i < data.length;i++){
      if(data[i].id === value){
        return i;
      }
    }
  }

  checkInindex(indexes, j){
    for(let i = 0; i < indexes.length;i++){
      if(indexes[i] === j){
        return true;
      }
    }
    return false;
  }

  getSmallerValue(data, indexes){
    let smallerValue = 0;
    for(let i = 0; i < data.length;i++){

      if(!this.checkInindex(indexes, i)){
          if(smallerValue === 0){
            smallerValue = data[i].id;
          }else{
            if(data[i].id < smallerValue ){
              smallerValue = data[i].id;
            }
          }
      }
      
    }
    return smallerValue;
  }
  
}
