import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  HOME_ROUTE,
  HomeComponent
} from './';

@NgModule({
  imports: [
    RouterModule.forRoot([HOME_ROUTE])
  ],
  declarations: [
    HomeComponent,
  ],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverHomeModule {
}
