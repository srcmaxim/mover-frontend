import { NgModule, Sanitizer } from '@angular/core';
import {
  SharedLibsModule
} from './';

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
