import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {employeePopupRoute, employeeRoute} from "./employee.route";
import {EmployeeComponent} from "./employee.component";
import {EmployeeDetailComponent} from "./employee-detail.component";
import {EmployeeDialogComponent} from "./employee-dialog.component";
import {EmployeeDeleteDialogComponent} from "./employee-delete-dialog.component";
import {EmployeeService} from "./employee.service";
import {LeadEntityDetailComponent} from "./entity/lead-detail.component";
import {LeadAddDialogComponent} from "./entity/lead-add-dialog.component";
import {AuthGuard} from "../../shared/auth/auth.guard";
import {AuthService} from "../../shared/auth/services/auth.service";

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
    LeadEntityDetailComponent,
    LeadAddDialogComponent
  ],
  entryComponents: [
    EmployeeComponent,
    EmployeeDetailComponent,
    EmployeeDialogComponent,
    EmployeeDeleteDialogComponent,
    LeadEntityDetailComponent,
    LeadAddDialogComponent
  ],
  providers: [
    EmployeeService,
    AuthGuard,
    AuthService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverEmployeeModule {}
