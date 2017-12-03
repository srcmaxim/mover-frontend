import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {employeeRoute} from './employee.route';
import {EmployeeComponent} from './employee.component';
import {EmployeeDetailComponent} from './employee-detail.component';
import {EmployeeDialogComponent} from './employee-dialog.component';
import {EmployeeDeleteDialogComponent} from './employee-delete-dialog.component';
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
