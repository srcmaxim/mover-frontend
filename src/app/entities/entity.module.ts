import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { MoverLeadModule } from './lead/lead.module';
import { MoverCustomerModule } from './customer/customer.module';
import { MoverEmployeeModule } from './employee/employee.module';

@NgModule({
  imports: [
    MoverLeadModule,
    MoverCustomerModule,
    MoverEmployeeModule,
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverEntityModule {}
