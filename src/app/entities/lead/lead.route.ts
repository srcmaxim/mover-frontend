import {Routes} from '@angular/router';
import {
  LeadComponent,
  LeadDetailComponent,
  LeadDeleteDialogComponent
} from './';

export const leadRoute: Routes = [
  {
    path: 'lead',
    component: LeadComponent,
  }, {
    path: 'lead/:id',
    component: LeadDetailComponent
  }
];

export const leadPopupRoute: Routes = [
  {
    path: 'lead/:id/delete',
    component: LeadDeleteDialogComponent,
    outlet: 'popup'
  }
];
