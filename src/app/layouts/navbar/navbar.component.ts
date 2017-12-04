import {Component, OnInit} from '@angular/core';
import {SemanticDropdownLoader} from '../';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  constructor(private dropdownLoader: SemanticDropdownLoader) {
  }

  ngOnInit() {
    this.dropdownLoader.load();
  }

}
