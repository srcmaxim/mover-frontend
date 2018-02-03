import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedCommonModule, SharedLibsModule} from './';
import {AuthModule} from "./auth/auth.module";
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
  exports: [
    SharedLibsModule,
    SharedCommonModule,
    AuthModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
}
