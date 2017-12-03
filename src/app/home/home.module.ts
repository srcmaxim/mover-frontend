import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HomeComponent} from './home.component';
import {HOME_ROUTE} from './home.route';

@NgModule({
  imports: [
    RouterModule.forRoot([ HOME_ROUTE ])
  ],
  declarations: [
    HomeComponent,
  ],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MoverHomeModule {}
