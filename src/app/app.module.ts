import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { NavbarComponent } from './layouts/navbar/navbar.component';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SemanticDropdownDirective } from './layouts/directives/semantic-dropdown.directive';
import { LeadComponent } from './entities/lead/lead.component';
import { CustomerComponent } from './entities/customer/customer.component';
import { EmployeeComponent } from './entities/employee/employee.component';
import { HomeComponent } from './home/home.component';
import { LeadDetailComponent } from './entities/lead/lead-detail.component';
import { CustomerDetailComponent } from './entities/customer/customer-detail.component';
import { EmployeeDetailComponent } from './entities/employee/employee-detail.component';
import { LeadDeleteDialogComponent } from './entities/lead/lead-delete-dialog.component';
import { SemanticModalDirective } from './layouts/directives/semantic-modal.directive';
import { CustomerDeleteDialogComponent } from './entities/customer/customer-delete-dialog.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    FooterComponent,
    SemanticDropdownDirective,
    LeadComponent,
    CustomerComponent,
    EmployeeComponent,
    HomeComponent,
    LeadDetailComponent,
    CustomerDetailComponent,
    EmployeeDetailComponent,
    LeadDeleteDialogComponent,
    SemanticModalDirective,
    CustomerDeleteDialogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
