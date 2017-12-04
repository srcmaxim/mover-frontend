import {Routes} from '@angular/router';
import {EmployeeComponent} from './employee.component';
import {EmployeeDetailComponent} from './employee-detail.component';
import {EmployeeDeleteDialogComponent} from "./employee-delete-dialog.component";

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
    path: 'employee/:id/delete',
    component: EmployeeDeleteDialogComponent,
    outlet: 'popup'
  }
];
