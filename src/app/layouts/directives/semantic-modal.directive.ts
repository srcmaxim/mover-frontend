import {AfterViewInit, Directive} from '@angular/core';

declare var jQuery: any;

/**
 * SemanticDropdownDirective is used for initializing Semantic UI dropdown.
 */
@Directive({
  selector: '[appModal]'
})
export class SemanticModalDirective implements AfterViewInit {

  ngAfterViewInit(): void {
    jQuery('[appModal]').modal('show');
  }

}
