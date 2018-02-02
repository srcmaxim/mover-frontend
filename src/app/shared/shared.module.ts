import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedCommonModule, SharedLibsModule} from './';
import {AuthModule} from "./auth/auth.module";

@NgModule({
  imports: [
    SharedLibsModule,
    SharedCommonModule,
    AuthModule
  ],
  declarations: [],
  providers: [],
  exports: [
    SharedCommonModule,
    AuthModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
