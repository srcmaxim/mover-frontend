import { NgModule, Sanitizer } from '@angular/core';
import {SharedLibsModule} from './shared-libs.module';

@NgModule({
  imports: [
    SharedLibsModule
  ],
  declarations: [],
  providers: [],
  exports: [
    SharedLibsModule,
  ]
})
export class SharedCommonModule {}
