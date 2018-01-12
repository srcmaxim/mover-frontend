import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/';
import {leadPopupRoute, leadRoute} from "./lead.route";
import {LeadComponent} from "./lead.component";
import {LeadDetailComponent} from "./lead-detail.component";
import {LeadDialogComponent} from "./lead-dialog.component";
import {LeadDeleteDialogComponent} from "./lead-delete-dialog.component";
import {LeadService} from "./lead.service";
import {EstimateDetailComponent} from "./embedded/estimate-detail.component";
import {InventoryDetailComponent} from "./embedded/inventory-detail.component";
import {EstimateDialogComponent} from "./embedded/estimate-dialog.component";
import {InventoryDialogComponent} from "./embedded/inventory-dialog.component";
import {EmployeeEntityDetailComponent} from "./entities/employee-detail.component";
import {EmployeeAddDialogComponent} from "./entities/employee-add-dialog.component";

const ENTITY_STATES = [
  ...leadRoute,
  ...leadPopupRoute
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(ENTITY_STATES)
  ],
  declarations: [
    LeadComponent,
    LeadDetailComponent,
    EstimateDetailComponent,
    InventoryDetailComponent,
    EstimateDialogComponent,
    InventoryDialogComponent,
    LeadDialogComponent,
    LeadDeleteDialogComponent,
    EmployeeEntityDetailComponent,
    EmployeeAddDialogComponent
  ],
  entryComponents: [
    LeadComponent,
    LeadDetailComponent,
    EstimateDetailComponent,
    InventoryDetailComponent,
    EstimateDialogComponent,
    InventoryDialogComponent,
    LeadDialogComponent,
    LeadDeleteDialogComponent,
    EmployeeEntityDetailComponent,
    EmployeeAddDialogComponent
  ],
  providers: [
    LeadService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverLeadModule {
}
