import {
  Pipe,
  PipeTransform
} from '@angular/core';
import {
  MessageProvider
} from '../../providers/message/message';
import {
  DatePipe
} from '@angular/common';

/**
 * Generated class for the TxndataPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 * 
 * Ratikanta
 */
@Pipe({
  name: 'txndata',
})
export class TxndataPipe implements PipeTransform {
  /**
   * Deal with txn data
   */

  constructor(private datePipe: DatePipe) {

  }
  transform(data: any, ...args): any {

    let type: number = args[0].type;
    let facilityId: number = args[0].facilityId;

    switch (type) {
      case MessageProvider.TXNDATAPIPE_TYPE.FACILITY_VALIDATION:

        //condition should be 
        //1. Type should be facility
        //2. date should be of today  

        let filteredData = data.filter(d => (d.data.c5 === facilityId &&
          d.data.c7 === this.datePipe.transform(new Date, 'dd-MM-y')));


        if (filteredData.length > 0) {
          //we found data of today
          return true;
        } else {
          //we could find any record greater than yesterday so, no record found, we should return false
          return false;
        }
      case MessageProvider.TXNDATAPIPE_TYPE.ORDER_BY_DATE_DESC:
        let newArray = [];
        let originalArray = data;
        let originalTempLength = originalArray.length;
        while (newArray.length < originalTempLength) {

          let latestObj: any;
          for (let i = 0; i < originalArray.length; i++) {
            if (latestObj === undefined) {
              latestObj = originalArray[0];
            } else {
              
              let latestObjDateDateType = new Date(
                parseInt(latestObj.id.split("-")[0]),
                parseInt(latestObj.id.split("-")[1]),
                parseInt(latestObj.id.split("-")[2]),
                parseInt(latestObj.id.split("-")[3]),
                parseInt(latestObj.id.split("-")[4]),
                parseInt(latestObj.id.split("-")[5])
              );
              let originalDateDateType = new Date(
                parseInt(originalArray[i].id.split("-")[0]),
                parseInt(originalArray[i].id.split("-")[1]),
                parseInt(originalArray[i].id.split("-")[2]),
                parseInt(originalArray[i].id.split("-")[3]),
                parseInt(originalArray[i].id.split("-")[4]),
                parseInt(originalArray[i].id.split("-")[5])

              );



              if (originalDateDateType > latestObjDateDateType) {
                latestObj = originalArray[i];
              }
            }
          }
          newArray.push(latestObj);
          for (let i = 0; i < originalArray.length; i++) {
            if (originalArray[i].id === latestObj.id) {
              originalArray.splice(i, 1);
              break;
            }
          }
        }
        return newArray;
      default:
        return;
    }


  }
}
