import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {customerRoute} from './customer.route';
import {CustomerComponent} from './customer.component';
import {CustomerDetailComponent} from './customer-detail.component';
import {CustomerDialogComponent} from './customer-dialog.component';
import {CustomerDeleteDialogComponent} from './customer-delete-dialog.component';
import {SharedModule} from '../../shared/shared.module';

const ENTITY_STATES = [
  ...customerRoute,
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
