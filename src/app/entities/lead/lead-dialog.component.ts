import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lead} from './';
import {SemanticCalendarLoader} from "../../layouts/loaders/semantic-calendar-loader.service";
import {SemanticDropdownLoader} from "../../layouts/loaders/semantic-dropdown-loader.service";

@Component({
  selector: 'app-lead-dialog',
  templateUrl: './lead-dialog.component.html',
  styleUrls: ['./lead-dialog.component.css']
})
export class LeadDialogComponent implements OnInit, OnDestroy {

  routeSub: any;
  lead: Lead;

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private calendarLoader: SemanticCalendarLoader,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.dropdownLoader.load();
    this.calendarLoader.load();

    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.lead = new Lead({id: id});
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
