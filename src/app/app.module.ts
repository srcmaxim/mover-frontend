import {NgModule} from '@angular/core';

import {LayoutRoutingModule} from './layouts/layout-routing.module';

import {MoverHomeModule} from './home/home.module';
import {MoverEntityModule} from './entities/entity.module';
import {FooterComponent, MainComponent, NavbarComponent, RibbonComponent, FakeRibbonComponent} from './layouts/';
import {SharedModule} from './shared/';
import {environment} from "../environments/environment";

let Ribbon = [];
if (environment.useRibbon) {
  Ribbon.push(RibbonComponent);
} else {
  Ribbon.push(FakeRibbonComponent);
}

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
    FooterComponent,
    ...Ribbon
  ],
  bootstrap: [MainComponent]
})
export class MoverModule {
}
