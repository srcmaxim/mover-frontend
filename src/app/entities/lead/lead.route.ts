import {Routes} from '@angular/router';
import {LeadComponent} from "./lead.component";
import {LeadDetailComponent} from "./lead-detail.component";
import {LeadDialogComponent} from "./lead-dialog.component";
import {LeadDeleteDialogComponent} from "./lead-delete-dialog.component";
import {EstimateDialogComponent} from "./embedded/estimate-dialog.component";
import {InventoryDialogComponent} from "./embedded/inventory-dialog.component";
import {EmployeeAddDialogComponent} from "./entities/employee-add-dialog.component";
import {CustomerChangeDialogComponent} from "./entities/customer-change-dialog.component";


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
  },
  {
    path: 'lead/:id/estimate/:index/edit',
    component: EstimateDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'lead/:id/estimate/new',
    component: EstimateDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'lead/:id/inventory/:index/edit',
    component: InventoryDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'lead/:id/inventory/new',
    component: InventoryDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'lead/:id/employee/add',
    component: EmployeeAddDialogComponent,
    outlet: 'popup'
  },
  {
    path: 'lead/:id/customer/change',
    component: CustomerChangeDialogComponent,
    outlet: 'popup'
  }
];
