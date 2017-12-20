import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {MoverLeadModule} from './lead/lead.module';
import {MoverCustomerModule} from './customer/customer.module';
import {MoverEmployeeModule} from './employee/employee.module';
import {SharedModule} from "../shared/index";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryEntitiesService} from "./entities.in-memory.service";
import {environment} from '../../environments/environment';

let InMemoryWebApi = [];
if (environment.useInMemoryWebApi) {
  InMemoryWebApi.push(
    HttpClientInMemoryWebApiModule
    .forRoot(InMemoryEntitiesService, {delay: 500}));
}

@NgModule({
  imports: [
    SharedModule,
    MoverLeadModule,
    MoverCustomerModule,
    MoverEmployeeModule,
    ...InMemoryWebApi,
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverEntityModule {
}
