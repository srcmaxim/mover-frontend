import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from './';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {EmployeeService} from "./employee.service";

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  private employee: Observable<Employee>;
  changeSubscription: any;
  routeSubscription: any;

  constructor(private route: ActivatedRoute,
              private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employee = this.employeeService.change
      .map((employees: Employee[]) => employees[0]);
    this.changeSubscription = this.employee.subscribe();

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.employeeService.find(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
