import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../customer/customer.service";
import {LeadService} from "./lead.service";
import {Customer} from "../customer/customer.model";
import {HttpParams} from "@angular/common/http";
import {Lead} from "./lead.model";
import {Employee} from "../employee/employee.model";
import {EmployeeService} from "../employee/employee.service";

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit, OnDestroy {

  private lead: Observable<Lead>;
  private customer: Observable<Customer>;
  private employees: Observable<Employee[]>;
  private routeSubscription: any;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private employeeService: EmployeeService,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.lead = this.leadService.singleChange;
    this.customer = this.customerService.singleChange;
    this.employees = this.employeeService.multiChange;

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leadService.find(id);
      }
    });

    this.lead.subscribe((lead: Lead) => {
      let params = new HttpParams().set('leadId', String(lead.id));
      this.customerService.query({params});
      this.employeeService.query({params});
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
