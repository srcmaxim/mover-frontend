import {Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CustomerDetailComponent} from './customer-detail.component';
import {CustomerDeleteDialogComponent} from './customer-delete-dialog.component';

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
    path: 'customer/:id/delete',
    component: CustomerDeleteDialogComponent,
    outlet: 'popup'
  }
];
