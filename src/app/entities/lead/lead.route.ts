import {Routes} from '@angular/router';
import {LeadComponent} from './lead.component';
import {LeadDetailComponent} from './lead-detail.component';

export const leadRoute: Routes = [
  {
    path: 'lead',
    component: LeadComponent,
  }, {
    path: 'lead/:id',
    component: LeadDetailComponent
  }
];
