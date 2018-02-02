import {Routes} from '@angular/router';
import {LeadComponent} from "./lead.component";
import {LeadDetailComponent} from "./lead-detail.component";
import {LeadDialogComponent} from "./lead-dialog.component";
import {LeadDeleteDialogComponent} from "./lead-delete-dialog.component";
import {EstimateDialogComponent} from "./embedded/estimate-dialog.component";
import {InventoryDialogComponent} from "./embedded/inventory-dialog.component";
import {EmployeeAddDialogComponent} from "./entities/employee-add-dialog.component";
import {CustomerChangeDialogComponent} from "./entities/customer-change-dialog.component";
import {AuthGuard} from "../../shared/auth/auth.guard";


export const leadRoute: Routes = [
  {
    path: 'lead',
    component: LeadComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'lead/:id',
    component: LeadDetailComponent,
    canActivate: [AuthGuard]
  }
];

export const leadPopupRoute: Routes = [
  {
    path: 'lead/new',
    component: LeadDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/edit',
    component: LeadDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/delete',
    component: LeadDeleteDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/estimate/:index/edit',
    component: EstimateDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/estimate/new',
    component: EstimateDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/inventory/:index/edit',
    component: InventoryDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/inventory/new',
    component: InventoryDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/employee/add',
    component: EmployeeAddDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  },
  {
    path: 'lead/:id/customer/change',
    component: CustomerChangeDialogComponent,
    outlet: 'popup',
    canActivate: [AuthGuard]
  }
];
