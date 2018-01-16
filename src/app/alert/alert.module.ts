import {ErrorInterceptor} from "./interceptors/error.interceptor";
import {NotificationInterceptor} from "./interceptors/notification.interceptor";
import {EventManager} from "./event-manager.service";
import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NotificationInterceptor,
      multi: true,
    },
    EventManager
  ]
})
export class AlertModule {
}
