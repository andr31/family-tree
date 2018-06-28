import {Pipe, PipeTransform} from '@angular/core';
import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

/*
 * transform firebase timestamps to simple date in order to be able to use built in date pipe
*/
@Pipe({name: 'fireBaseTimestampToDate'})
export class FireBaseTimestampToDatePipe implements PipeTransform {
  transform(timestampValue: Timestamp) {
    return (timestampValue.seconds * 1000);
  }
}
