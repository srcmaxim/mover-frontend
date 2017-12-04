import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  customerRoute,
  customerPopupRoute,
  CustomerComponent,
  CustomerDetailComponent,
  CustomerDialogComponent,
  CustomerDeleteDialogComponent
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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverCustomerModule {}
