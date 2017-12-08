import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "./employee.service";
import {LeadService} from "../lead/lead.service";
import {HttpParams} from "@angular/common/http";
import "rxjs/add/operator/take";
import {Lead} from "../lead/lead.model";
import {Employee} from "./employee.model";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  private employee: Observable<Employee>;
  private leads: Observable<Lead[]>;
  private routeSubscription: any;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.employee = this.employeeService.singleChange;
    this.leads = this.leadService.multiChange;

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employeeService.find(id);
      }
    });

    this.employee.subscribe((employee: Employee) => {
      let params = new HttpParams().set('employeeId', String(employee.id));
      this.leadService.query({params});
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
