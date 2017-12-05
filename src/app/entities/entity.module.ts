import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MoverLeadModule} from './lead/lead.module';
import {MoverCustomerModule} from './customer/customer.module';
import {MoverEmployeeModule} from './employee/employee.module';
import {SharedModule} from "../shared/index";

@NgModule({
  imports: [
    SharedModule,
    MoverLeadModule,
    MoverCustomerModule,
    MoverEmployeeModule
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverEntityModule {
}
