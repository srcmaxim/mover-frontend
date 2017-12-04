import {Injectable} from '@angular/core';
import 'rxjs/add/operator/filter';
import {Loader} from './loader.model';

declare var jQuery: any;

/**
 * SemanticCalendarLoader is used for initializing Semantic UI calendar.
 * Additional for using calendar requires #rangeStart, #rangeEnd ids and [appCalendar].
 */
@Injectable()
export class SemanticCalendarLoader implements Loader {

  private CALENDAR_SETTINGS = {
    firstDayOfWeek: 1,
    type: 'datetime',
    timePickerIncrement: 15,
    formatter: {datetime: this.formattedDateTime}
  };

  private FORMATTER_SETTINGS = {
    hour12: false
  };

  public load(): void {
    /* used for async initialization of calendar */
    setTimeout(() => {
      this.setupRangeStartCalendar();
      this.setupRangeEndCalendar();
    });
  }

  private setupRangeEndCalendar() {
    jQuery('#rangeEnd[appCalendar]').calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        startCalendar: jQuery('#rangeStart[appCalendar]')
      })
    );
  }

  private setupRangeStartCalendar() {
    jQuery('#rangeStart[appCalendar]').calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        endCalendar: jQuery('#rangeEnd[appCalendar]')
      })
    );
  }

  private formattedDateTime(date: Date): string {
    return date
      ? date.toLocaleString('eu', this.FORMATTER_SETTINGS)
      : '';
  }
}
