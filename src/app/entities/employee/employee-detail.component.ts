import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "./employee.service";
import {LeadService} from "../lead/lead.service";
import "rxjs/add/operator/take";
import {Lead} from "../lead/lead.model";
import {Employee} from "./employee.model";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  private employee: Observable<Employee>;
  private leads: Observable<Lead[]>;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.route.params.take(1).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employee = this.employeeService.singleCast;
        this.leads = this.leadService.multiCast;

        this.employeeService.find(id).first().subscribe();
        //todo: fetch employee leads
        this.leadService.query().first().subscribe();
      }
    });
  }
}
