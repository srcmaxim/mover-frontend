import {NgModule} from '@angular/core';

import {LayoutRoutingModule} from './layouts/layout-routing.module';

import {MoverHomeModule} from './home/home.module';
import {MoverEntityModule} from './entities/entity.module';
import {MainComponent} from './layouts/main/main.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {FooterComponent} from './layouts/footer/footer.component';
import {SharedModule} from './shared/shared.module';

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
  bootstrap: [ MainComponent ]
})
export class MoverModule {}
