import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {EmployeeService} from "./employee.service";
import {Employee} from './';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {

  private employees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.employees = this.employeeService.query();
    this.employees.subscribe(
      data => console.log(JSON.stringify(data))
    );
  }
}
