import {Routes} from '@angular/router';
import {CustomerComponent} from "./customer.component";
import {CustomerDetailComponent} from "./customer-detail.component";
import {CustomerDialogComponent} from "./customer-dialog.component";
import {CustomerDeleteDialogComponent} from "./customer-delete-dialog.component";
import {LeadAddDialogComponent} from "./entity/lead-add-dialog.component";
import {AuthGuard} from "../../shared/auth/auth.guard";

export const customerRoute: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'customer/:id',
    component: CustomerDetailComponent,
    canActivate: [AuthGuard]
  }
];

export const customerPopupRoute: Routes = [
  {
    path: 'customer/new',
    component: CustomerDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id/edit',
    component: CustomerDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id/delete',
    component: CustomerDeleteDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id/lead/add',
    component: LeadAddDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  }
];
