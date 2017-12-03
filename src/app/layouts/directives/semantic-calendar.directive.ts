import {Directive, OnInit} from '@angular/core';

declare var jQuery: any;

/**
 * SemanticCalendarDirective is used for initializing Semantic UI calendar.
 * Additional for using calendar requires #rangeStart, #rangeEnd ids.
 */
@Directive({
  selector: '[appCalendar]'
})
export class SemanticCalendarDirective implements OnInit {

  private CALENDAR_SETTINGS = {
    firstDayOfWeek: 1,
    type: 'datetime',
    timePickerIncrement: 15,
    formatter: {datetime: this.formattedDateTime}
  };

  private FORMATTER_SETTINGS = {
    hour12: false
  };

  ngOnInit(): void {
    /* used for async initialization of calendar */
    setTimeout(() => {
      this.setupRangeStartCalendar();
      this.setupRangeEndCalendar();
    });
  }

  private setupRangeEndCalendar() {
    jQuery('#rangeEnd').calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        startCalendar: jQuery('#rangeStart')
      })
    );
  }

  private setupRangeStartCalendar() {
    jQuery('#rangeStart').calendar(
      Object.assign({}, this.CALENDAR_SETTINGS, {
        endCalendar: jQuery('#rangeEnd')
      })
    );
  }

  private formattedDateTime(date: Date): string {
    return date
      ? date.toLocaleString('eu', this.FORMATTER_SETTINGS)
      : '';
  }
}
