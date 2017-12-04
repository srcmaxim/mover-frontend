import {NgModule} from '@angular/core';

import {LayoutRoutingModule} from './layouts/layout-routing.module';

import {MoverHomeModule} from './home/home.module';
import {MoverEntityModule} from './entities/entity.module';
import {FooterComponent, MainComponent, NavbarComponent} from './layouts/';
import {SharedModule} from './shared/';

@NgModule({
  imports: [
    SharedModule,
    LayoutRoutingModule,
    MoverHomeModule,
    MoverEntityModule
  ],
  declarations: [
    NavbarComponent,
    MainComponent,
    FooterComponent
  ],
  bootstrap: [MainComponent]
})
export class MoverModule {
}
