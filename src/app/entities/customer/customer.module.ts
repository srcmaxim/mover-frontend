import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {customerPopupRoute, customerRoute} from "./customer.route";
import {CustomerComponent} from "./customer.component";
import {CustomerDetailComponent} from "./customer-detail.component";
import {CustomerDialogComponent} from "./customer-dialog.component";
import {CustomerDeleteDialogComponent} from "./customer-delete-dialog.component";
import {CustomerService} from "./customer.service";

const ENTITY_STATES = [
  ...customerRoute,
  ...customerPopupRoute
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(ENTITY_STATES)
  ],
  declarations: [
    CustomerComponent,
    CustomerDetailComponent,
    CustomerDialogComponent,
    CustomerDeleteDialogComponent,
  ],
  entryComponents: [
    CustomerComponent,
    CustomerDialogComponent,
    CustomerDeleteDialogComponent,
  ],
  providers: [
    CustomerService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverCustomerModule {
}
