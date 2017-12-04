import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  leadRoute,
  leadPopupRoute,
  LeadComponent,
  LeadDetailComponent,
  LeadDialogComponent,
  LeadDeleteDialogComponent
} from './';
import {SharedModule} from '../../shared/shared.module';

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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverLeadModule {}
