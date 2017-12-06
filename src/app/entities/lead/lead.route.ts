import {Routes} from '@angular/router';
import {
  LeadComponent,
  LeadDetailComponent,
  LeadDialogComponent,
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
    path: 'lead/new',
    component: LeadDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'lead/:id/edit',
    component: LeadDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'lead/:id/delete',
    component: LeadDeleteDialogComponent,
    outlet: 'popup'
  }
];
