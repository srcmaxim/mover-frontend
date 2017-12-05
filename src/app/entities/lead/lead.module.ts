import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  InMemoryLeadService,
  LeadDetailComponent,
  LeadComponent,
  LeadDeleteDialogComponent,
  LeadDialogComponent,
  leadPopupRoute,
  leadRoute,
  LeadService
} from './';
import {SharedModule} from '../../shared/';
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";

const ENTITY_STATES = [
  ...leadRoute,
  ...leadPopupRoute
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forRoot(ENTITY_STATES),
    HttpClientInMemoryWebApiModule.forRoot(InMemoryLeadService),
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
