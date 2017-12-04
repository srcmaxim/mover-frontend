import {Injectable} from '@angular/core';
import {Loader} from './loader.model';

declare var jQuery: any;

/**
 * SemanticDropdownLoader is used for initializing Semantic UI dropdown.
 * Additional for using dropdown requires [appDropdown].
 */

@Injectable()
export class SemanticDropdownLoader implements Loader {

  public load(): void {
    jQuery('[appDropdown]').dropdown();
  }

}
