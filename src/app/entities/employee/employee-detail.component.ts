import { Component, OnInit } from '@angular/core';
import {Employee} from './employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {

  private employee: Employee;

  constructor() {
    this.employee = new Employee({
      firstName: 'Sesk',
      lastName: 'Fabrigas',
      email: 'sesk_fabrigas@gmail.com',
      phone: '+380-333-2013',
      leadIds: [1, 2, 3]
    });
  }

  ngOnInit() {
  }

}
