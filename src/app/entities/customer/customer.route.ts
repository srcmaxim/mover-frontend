import {Routes} from '@angular/router';
import {CustomerComponent} from "./customer.component";
import {CustomerDetailComponent} from "./customer-detail.component";
import {CustomerDialogComponent} from "./customer-dialog.component";
import {CustomerDeleteDialogComponent} from "./customer-delete-dialog.component";
import {LeadAddDialogComponent} from "./entity/lead-add-dialog.component";

export const customerRoute: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
  }, {
    path: 'customer/:id',
    component: CustomerDetailComponent
  }
];

export const customerPopupRoute: Routes = [
  {
    path: 'customer/new',
    component: CustomerDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'customer/:id/edit',
    component: CustomerDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'customer/:id/delete',
    component: CustomerDeleteDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'customer/:id/lead/add',
    component: LeadAddDialogComponent,
    outlet: 'popup'
  }
];
