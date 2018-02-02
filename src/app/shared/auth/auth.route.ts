import {Routes} from '@angular/router';
import {AuthComponent} from "./component/auth.component";

export const authPopupRoute: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    outlet: 'popup'
  }
];
