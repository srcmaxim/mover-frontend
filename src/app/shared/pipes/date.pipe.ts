import {Pipe, PipeTransform} from "@angular/core";
import {DatePipe} from "@angular/common";

/**
 * Accepts or returns date in ISO8601 format: yyyy-mm-ddThh:mm:ss
 */
@Pipe({name: 'iso8601Date'})
export class Iso8601Date implements PipeTransform {
  static FORMATTER = new DatePipe('en-Us');
  transform(value: any): any {
    return Iso8601Date.FORMATTER.transform(value, 'yyyy-MM-ddTHH:mm:ss');
  }
}

/**
 * Accepts or returns date in custom format: yyyy-mm-dd hh:mm
 */
@Pipe({name: 'customDate'})
export class CustomDate implements PipeTransform {
  static FORMATTER = new DatePipe('en-Us');
  transform(value: any): any {
    return CustomDate.FORMATTER.transform(value, 'yyyy-MM-dd HH:mm');
  }
}
