import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {SharedLibsModule} from './shared-libs.module';
import {SharedCommonModule} from './shared-common.module';

@NgModule({
  imports: [
    SharedLibsModule,
    SharedCommonModule
  ],
  declarations: [],
  providers: [],
  exports: [
    SharedCommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}
