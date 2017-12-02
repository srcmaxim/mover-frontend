import {AfterViewInit, Directive} from '@angular/core';

declare var jQuery: any;

/**
 * SemanticDropdownDirective is used for initializing Semantic UI dropdown.
 */
@Directive({
  selector: '[appDropdown]'
})
export class SemanticDropdownDirective implements AfterViewInit {

  ngAfterViewInit(): void {
    jQuery('[appDropdown]').dropdown();
  }

}
