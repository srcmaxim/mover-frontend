import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {navbarRoute} from '../app.route';
import {
  SemanticDropdownLoader,
  SemanticCalendarLoader
} from './';

const LAYOUT_ROUTES = [
  navbarRoute,
];

@NgModule({
  imports: [
    RouterModule.forRoot(LAYOUT_ROUTES)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SemanticDropdownLoader,
    SemanticCalendarLoader
  ]
})
export class LayoutRoutingModule {
}
