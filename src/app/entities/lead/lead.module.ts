import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {SharedModule} from '../../shared/';
import {leadPopupRoute, leadRoute} from "./lead.route";
import {LeadComponent} from "./lead.component";
import {LeadDetailComponent} from "./lead-detail.component";
import {LeadDialogComponent} from "./lead-dialog.component";
import {LeadDeleteDialogComponent} from "./lead-delete-dialog.component";
import {LeadService} from "./lead.service";

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
    LeadDialogComponent,
    LeadDeleteDialogComponent,
  ],
  entryComponents: [
    LeadComponent,
    LeadDialogComponent,
    LeadDeleteDialogComponent,
  ],
  providers: [
    LeadService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverLeadModule {
}
