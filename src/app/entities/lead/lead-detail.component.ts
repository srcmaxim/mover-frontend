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
import {Estimate} from "./estimate.model";
import {Inventory} from "./inventory.model";

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {

  private lead: Observable<Lead>;
  private estimates: Observable<Estimate[]>;
  private inventories: Observable<Inventory[]>;
  private customer: Observable<Customer>;
  private employees: Observable<Employee[]>;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private employeeService: EmployeeService,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.route.params.take(1).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.lead = this.leadService.singleCast;
        this.estimates = this.leadService.multiCastEstimates;
        this.inventories = this.leadService.multiCastInventories;
        this.customer = this.customerService.singleCast;
        this.employees = this.employeeService.multiCast;

        this.leadService.find(id).first().subscribe();
        this.leadService.findEstimates(id).first().subscribe();
        this.leadService.findInventories(id).first().subscribe();
        this.customerService.find(id).first().subscribe();
        this.employeeService.query().first().subscribe();
      }
    });
  }
}
