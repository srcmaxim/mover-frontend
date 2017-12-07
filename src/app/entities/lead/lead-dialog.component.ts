import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lead} from './';
import {SemanticCalendarLoader, SemanticDropdownLoader} from '../../layouts/';
import {Employee} from '../employee/';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LeadService} from "./lead.service";
import {Customer} from "../customer/customer.model";

@Component({
  selector: 'app-lead-dialog',
  templateUrl: './lead-dialog.component.html',
  styleUrls: ['./lead-dialog.component.css']
})
export class LeadDialogComponent implements OnInit, OnDestroy {

  private lead: FormGroup;
  private origin: FormGroup;
  private destination: FormGroup;
  private customers: Customer[];
  private employees: Employee[];
  private routeSubscription: any;
  private editSubscription: any;

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

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leadService.find(id);
        this.leadService.change.subscribe((leads: Lead[]) => {
          this.initForm(leads[0]);
        });
      } else {
        this.initForm(new Lead({}));
        this.customers = [];
        this.employees = [];
      }
    });
  }

  initForm(lead: Lead) {
    this.origin = this.formBuilder.group({
      address: lead.origin.address
    });
    this.destination = this.formBuilder.group({
      address: lead.destination.address
    });
    this.lead = this.formBuilder.group({
      id: lead.id,
      start: lead.start,
      end: lead.end,
      origin: this.origin,
      destination: this.destination,
      type: lead.type,
      status: lead.status
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    if (this.lead.value.id) {
      this.leadService.update(this.lead.value);
    } else {
      this.leadService.create(this.lead.value);
    }
    this.editSubscription = this.leadService.change.subscribe(() =>
      this.router.navigateByUrl('/lead'));
  }
}
