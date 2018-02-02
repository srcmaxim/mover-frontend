import {Routes} from '@angular/router';
import {EmployeeComponent} from "./employee.component";
import {EmployeeDetailComponent} from "./employee-detail.component";
import {EmployeeDialogComponent} from "./employee-dialog.component";
import {EmployeeDeleteDialogComponent} from "./employee-delete-dialog.component";
import {LeadAddDialogComponent} from "./entity/lead-add-dialog.component";
import {AuthGuard} from "../../shared/auth/auth.guard";


export const employeeRoute: Routes = [
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'employee/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  }
];

export const employeePopupRoute: Routes = [
  {
    path: 'employee/new',
    component: EmployeeDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id/edit',
    component: EmployeeDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id/delete',
    component: EmployeeDeleteDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'employee/:id/lead/add',
    component: LeadAddDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  }
];
