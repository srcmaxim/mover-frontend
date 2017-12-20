import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ribbon',
  template: `
    <div class="ribbon">
      <a href="/">development</a>
    </div>
  `,
  styleUrls: ['./ribbon.component.css']
})
export class RibbonComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-ribbon',
  template: ''
})
export class FakeRibbonComponent {
}
