import {Component, EventEmitter, OnInit} from '@angular/core';
import {SemanticDropdownLoader} from '../';
import {TranslateService} from '@ngx-translate/core';
import {defaultLang} from "../../shared/i18n/translations";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  lang = defaultLang;

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private translate: TranslateService) {
  }

  ngOnInit() {
    this.dropdownLoader.load();
  }

  switchLanguage(lang: string) {
    this.lang = lang;
    localStorage.setItem('lang', this.lang);
    this.translate.use(this.lang);
  }
}
