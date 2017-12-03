import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  employeeRoute,
  EmployeeComponent,
  EmployeeDetailComponent,
  EmployeeDialogComponent,
  EmployeeDeleteDialogComponent
} from './';
import {SharedModule} from '../../shared/shared.module';

const ENTITY_STATES = [
  ...employeeRoute,
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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverEmployeeModule {}
