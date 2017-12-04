import {Routes} from '@angular/router';
import {
  CustomerComponent,
  CustomerDetailComponent,
  CustomerDialogComponent,
  CustomerDeleteDialogComponent
} from './';

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
    path: 'customer/:id/edit',
    component: CustomerDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'customer/:id/delete',
    component: CustomerDeleteDialogComponent,
    outlet: 'popup'
  }
];
