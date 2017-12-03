import {Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {EmployeeDetailComponent} from './employee-detail.component';

export const employeeRoute: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
  }, {
    path: 'employee/:id',
    component: EmployeeDetailComponent
  }
];
