import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { NavbarComponent } from './layouts/navbar/navbar.component';
import { MainComponent } from './layouts/main/main.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SemanticDropdownDirective } from './layouts/directives/semantic-dropdown.directive';
import { LeadComponent } from './entities/lead/lead.component';
import { CustomerComponent } from './entities/customer/customer.component';

@NgModule({
  declarations: [
    NavbarComponent,
    MainComponent,
    FooterComponent,
    SemanticDropdownDirective,
    LeadComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [MainComponent]
})
export class AppModule { }
