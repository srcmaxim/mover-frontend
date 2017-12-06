import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  employeeRoute,
  employeePopupRoute,
  EmployeeComponent,
  EmployeeDetailComponent,
  EmployeeDialogComponent,
  EmployeeDeleteDialogComponent,
  EmployeeService
} from './';
import {SharedModule} from '../../shared/shared.module';

const ENTITY_STATES = [
  ...employeeRoute,
  ...employeePopupRoute
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(ENTITY_STATES)
  ],
  declarations: [
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeDialogComponent,
    EmployeeDeleteDialogComponent,
  ],
  entryComponents: [
    EmployeeComponent,
    EmployeeDialogComponent,
    EmployeeDeleteDialogComponent,
  ],
  providers: [
    EmployeeService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverEmployeeModule {}
