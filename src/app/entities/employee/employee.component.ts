import {Component, OnInit} from '@angular/core';
import {Employee} from './';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
})
export class EmployeeComponent implements OnInit {

  private employees: Employee[];

  constructor() {
    this.employees = [
      new Employee({
        id: 1,
        firstName: 'Sesk',
        lastName: 'Fabrigas',
        email: 'sesk_fabrigas@gmail.com',
        phone: '+380-333-2013'
      }),
      new Employee({
        id: 2,
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
