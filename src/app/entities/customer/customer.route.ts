import {Routes} from '@angular/router';
import {CustomerComponent} from './customer.component';
import {CustomerDetailComponent} from './customer-detail.component';

export const customerRoute: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
  }, {
    path: 'customer/:id',
    component: CustomerDetailComponent
  }
];
