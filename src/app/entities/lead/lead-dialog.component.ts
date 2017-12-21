import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SemanticCalendarLoader, SemanticDropdownLoader} from '../../layouts/';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LeadService} from "./lead.service";
import {CustomDate, Iso8601Date} from "../../shared/pipes/date.pipe";
import {Lead} from "./lead.model";

@Component({
  selector: 'app-lead-dialog',
  templateUrl: './lead-dialog.component.html',
  styleUrls: ['./lead-dialog.component.css']
})
export class LeadDialogComponent implements OnInit, OnDestroy {

  private lead: FormGroup;
  private origin: FormGroup;
  private destination: FormGroup;
  private routeSubscription: any;
  private editSubscription: any;
  private startDateSubscription: any;
  private endDateSubscription: any;

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private calendarLoader: SemanticCalendarLoader,
              private route: ActivatedRoute,
              private router: Router,
              private leadService: LeadService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dropdownLoader.load();
    this.calendarLoader.load();
    this.startDateSubscription = this.calendarLoader.startDateChange
      .subscribe((date) => this.lead.value.start = date);
    this.endDateSubscription = this.calendarLoader.endDateChange
      .subscribe((date) => this.lead.value.end = date);

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leadService.find(id);
        this.leadService.singleChange.subscribe((lead: Lead) => {
          this.fromEntityToForm(lead);
        });
      } else {
        this.fromEntityToForm(new Lead({}));
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
    if (this.startDateSubscription) {
      this.startDateSubscription.unsubscribe();
    }
    if (this.endDateSubscription) {
      this.endDateSubscription.unsubscribe();
    }
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    let lead = this.fromFormToEntity();
    if (lead.id) {
      this.leadService.update(lead);
    } else {
      this.leadService.create(lead);
    }
    this.editSubscription = this.leadService.singleChange.subscribe(() =>
      this.router.navigate([{outlets: {popup: null}}]));
  }

  fromEntityToForm(lead: Lead) {
    this.origin = this.formBuilder.group({
      address: lead.origin.address
    });
    this.destination = this.formBuilder.group({
      address: lead.destination.address
    });
    this.lead = this.formBuilder.group({
      id: lead.id,
      start: new CustomDate().transform(lead.start),
      end: new CustomDate().transform(lead.end),
      origin: this.origin,
      destination: this.destination,
      type: lead.type,
      status: lead.status
    });
  }

  fromFormToEntity(): Lead {
    const lead = this.lead.value;
    lead.start = new Date(new Iso8601Date().transform(lead.start));
    lead.end = new Date(new Iso8601Date().transform(lead.end));
    return new Lead(lead);
  }
}
