import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {EventManager} from "../event-manager.service";

@Injectable()
export class NotificationInterceptor implements HttpInterceptor {

  private TOPIC: string = 'alert/notify';
  private HEADER_NAME: string = 'X-moverApp-alert';
  private HEADER_PARAMS: string = 'X-moverApp-params';

  constructor(private eventManager: EventManager) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .do(event => {
        if (event instanceof HttpResponse
            && event.headers.has(this.HEADER_NAME)
            && event.headers.has(this.HEADER_PARAMS)) {
          this.eventManager.broadcast(this.TOPIC, {
            type: 'info',
            message: event.headers.get(this.HEADER_NAME),
            params: event.headers.get(this.HEADER_PARAMS)
          });
        }
      });
  }

  private isNotification(res: any) {
    return res.headers[this.HEADER_NAME];
  }
}
