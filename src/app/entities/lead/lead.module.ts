import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  LeadDetailComponent,
  LeadComponent,
  LeadDeleteDialogComponent,
  LeadDialogComponent,
  leadPopupRoute,
  leadRoute,
  LeadService
} from './';
import {SharedModule} from '../../shared/';

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
