import {Injectable} from '@angular/core';
import 'rxjs/add/operator/filter';
import {Loader} from './loader.model';
import {DatePipe} from "@angular/common";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/fromEventPattern";
import "rxjs/add/operator/debounce";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/mapTo";

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

  public startDateChange: any;
  public endDateChange: any;

  private CALENDAR_SETTINGS = {
    firstDayOfWeek: 1,
    type: 'datetime',
    timePickerIncrement: 15,
    formatter: {datetime: this.formattedDateTime}
  };

  private START_CALENDAR_ID = '#rangeStart[appCalendar]';
  private END_CALENDAR_ID = '#rangeEnd[appCalendar]';
  private START_ID = '#start';
  private END_ID = '#end';

  public load(): void {
    this.setupRangeStartCalendar();
    this.setupRangeEndCalendar();
    this.setupRangeEvents();
  }

  private setupRangeEndCalendar() {
    jQuery(this.END_CALENDAR_ID).calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        startCalendar: jQuery(this.START_CALENDAR_ID)
      })
    );
  }

  private setupRangeStartCalendar() {
    jQuery(this.START_CALENDAR_ID).calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        endCalendar: jQuery(this.END_CALENDAR_ID)
      })
    );
  }

  private setupRangeEvents() {
    let body = jQuery('body');
    let event = 'focusout';
    this.startDateChange = this.getEvent(body, event, this.START_CALENDAR_ID, this.START_ID);
    this.endDateChange = this.getEvent(body,event,  this.END_CALENDAR_ID, this.END_ID);
  }

  private getEvent(body, event,  calendarId, inputId) {
    return Observable.fromEventPattern(
      (handler) => body.on(event, calendarId, handler),
      (handler) => body.off(event, calendarId, handler)
    ).debounceTime(100).mapTo(() => jQuery(inputId).val());
  }

  private formattedDateTime(date: Date): string {
    return new DatePipe('en-US').transform(date, 'yyyy-MM-dd HH:mm');
  }
}
