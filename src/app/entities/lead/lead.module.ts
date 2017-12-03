import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {leadRoute} from './lead.route';
import {LeadComponent} from './lead.component';
import {LeadDetailComponent} from './lead-detail.component';
import {LeadDialogComponent} from './lead-dialog.component';
import {LeadDeleteDialogComponent} from './lead-delete-dialog.component';
import {SharedModule} from "../../shared/shared.module";

const ENTITY_STATES = [
  ...leadRoute,
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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverLeadModule {}
