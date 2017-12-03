import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
  HomeComponent,
  HOME_ROUTE
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
