import {authPopupRoute} from "./auth.route";
import {AuthComponent} from "./component/auth.component";
import {RouterModule} from "@angular/router";
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from "@angular/core";
import {AuthService} from "./services/auth.service";
import {AuthGuard} from "./auth.guard";
import {UserService} from "./services/user.service";
import {SharedLibsModule} from "../shared-libs.module";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptor} from "./interceptors/auth.interceptor";
import {RefreshTokenInterceptor} from "./interceptors/refresh-token.interceptor";
import {AuthEventsService} from "./services/auth-events.service";

const AUTH_STATES = [
  ...authPopupRoute
];

@NgModule({
  imports: [
    RouterModule.forRoot(AUTH_STATES),
    SharedLibsModule
  ],
  exports: [
  ],
  declarations: [
    AuthComponent
  ],
  entryComponents: [
    AuthComponent
  ],
  providers: [
    {provide: 'URL_LOGIN', useValue: '/api/auth/login'},
    {provide: 'URL_TOKEN', useValue: '/api/auth/token'},
    {provide: 'URL_WHOAMI', useValue: '/api/whoami'},
    AuthEventsService,
    AuthService,
    UserService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true,
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {
  /* eager init of AuthService */
  constructor(authService: AuthService) {
  }
}
