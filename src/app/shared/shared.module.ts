import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {SharedCommonModule, SharedLibsModule} from './';

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
export class SharedModule {
}
