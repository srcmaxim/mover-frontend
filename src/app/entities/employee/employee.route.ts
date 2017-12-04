import {Routes} from '@angular/router';
import {
  EmployeeComponent,
  EmployeeDetailComponent,
  EmployeeDialogComponent,
  EmployeeDeleteDialogComponent
} from './';

export const employeeRoute: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
  }, {
    path: 'employee/:id',
    component: EmployeeDetailComponent
  }
];

export const employeePopupRoute: Routes = [
  {
    path: 'employee/:id/edit',
    component: EmployeeDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'employee/:id/delete',
    component: EmployeeDeleteDialogComponent,
    outlet: 'popup'
  }
];
