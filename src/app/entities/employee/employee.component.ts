import { Component, OnInit } from '@angular/core';
import {Employee} from './employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {

  private employees: Employee[];

  constructor() {
    this.employees = [
      new Employee({
        firstName: 'Sesk',
        lastName: 'Fabrigas',
        email: 'sesk_fabrigas@gmail.com',
        phone: '+380-333-2013'
      }),
      new Employee({
        firstName: 'Samuel',
        lastName: 'Untity',
        email: 'samuel.untity@gmail.com',
        phone: '+380-314-1515'
      })
    ];
  }

  ngOnInit() {
  }

}
