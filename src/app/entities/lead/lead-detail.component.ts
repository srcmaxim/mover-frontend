import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../customer/customer.service";
import {LeadService} from "./lead.service";
import {Customer} from "../customer/customer.model";
import {Lead} from "./lead.model";
import {Employee} from "../employee/employee.model";
import {EmployeeService} from "../employee/employee.service";

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {

  private lead: Observable<Lead>;
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
        this.customer = this.customerService.singleCast;
        this.employees = this.employeeService.multiCast;

        this.leadService.find(id).first().subscribe();
        this.leadService.queryEstimates(id).first().subscribe();
        this.leadService.queryInventories(id).first().subscribe();
        this.customerService.findByLeadId({id: id}).first().subscribe();
        this.employeeService.queryByLeadId({id: id}).first().subscribe();
      }
    });
  }
}
