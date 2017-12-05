import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  CustomerComponent,
  CustomerDeleteDialogComponent,
  CustomerDetailComponent,
  CustomerDialogComponent,
  customerPopupRoute,
  customerRoute,
  CustomerService
} from './';
import {SharedModule} from '../../shared/shared.module';

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
