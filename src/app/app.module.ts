import {NgModule} from '@angular/core';

import {LayoutRoutingModule} from './layouts/layout-routing.module';

import {MoverHomeModule} from './home/home.module';
import {MoverEntityModule} from './entities/entity.module';
import {FakeRibbonComponent, FooterComponent, MainComponent, NavbarComponent, RibbonComponent} from './layouts/';
import {SharedModule} from './shared/';
import {environment} from "../environments/environment";
import {AlertComponent} from "./alert/components/alert.component";
import {AlertModule} from "./alert/alert.module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {defaultLang, translations} from "./shared/i18n/translations";

let Ribbon = [];
if (environment.useRibbon) {
  Ribbon.push(RibbonComponent);
} else {
  Ribbon.push(FakeRibbonComponent);
}

let Translations = translations;
let DefaultLang = defaultLang;

@NgModule({
  imports: [
    SharedModule,
    LayoutRoutingModule,
    MoverHomeModule,
    MoverEntityModule,
    AlertModule,
    TranslateModule.forRoot()
  ],
  declarations: [
    NavbarComponent,
    MainComponent,
    FooterComponent,
    AlertComponent,
    ...Ribbon
  ],
  bootstrap: [MainComponent]
})
export class MoverModule {

  constructor(translate: TranslateService) {
    Translations.forEach(i18n => {
      translate.setTranslation(i18n.lang, i18n.translations);
    });
    translate.setDefaultLang(DefaultLang);
  }
}
