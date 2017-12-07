import {Injectable} from '@angular/core';
import 'rxjs/add/operator/filter';
import {Loader} from './loader.model';
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEventPattern";
import "rxjs/add/operator/debounce";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/mapTo";
import {Subject} from "rxjs/Subject";

declare var jQuery: any;

/**
 * SemanticCalendarLoader is used for initializing Semantic UI calendar.
 * Additional for using calendar requires #rangeStart, #rangeEnd ids and [appCalendar] attribute,
 * also #start, #end ids for input.
 * Class works tight with JQuery and submits vars through startDateChange, endDateChange observers.
 * Observer should manually populate data to form:
 *        .submit(date => this.form.value.date = date)
 */
@Injectable()
export class SemanticCalendarLoader implements Loader {

  private startFirst: Subject<Date> = new Subject();
  private endFirst: Subject<Date> = new Subject();
  public startDateChange: Observable<Date> = this.startFirst.asObservable();
  public endDateChange: Observable<Date> = this.endFirst.asObservable();

  private CALENDAR_SETTINGS = {
    firstDayOfWeek: 1,
    type: 'datetime',
    timePickerIncrement: 15,
    formatter: {datetime: this.formattedDateTime}
  };
  private START_CALENDAR_ID = '#rangeStart[appCalendar]';
  private END_CALENDAR_ID = '#rangeEnd[appCalendar]';

  public load(): void {
    this.setupRangeStartCalendar();
    this.setupRangeEndCalendar();
  }

  private setupRangeStartCalendar() {
    jQuery(this.START_CALENDAR_ID).calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        endCalendar: jQuery(this.END_CALENDAR_ID),
        onChange: (date: Date) => this.startFirst.next(date)
      })
    );
  }

  private setupRangeEndCalendar() {
    jQuery(this.END_CALENDAR_ID).calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        startCalendar: jQuery(this.START_CALENDAR_ID),
        onChange: (date: Date) => this.endFirst.next(date)
      })
    );
  }

  private formattedDateTime(date: Date): string {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd HH:mm');
  }
}
