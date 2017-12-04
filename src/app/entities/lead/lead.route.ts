import {Routes} from '@angular/router';
import {LeadComponent} from './lead.component';
import {LeadDetailComponent} from './lead-detail.component';
import {LeadDeleteDialogComponent} from './lead-delete-dialog.component';

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
