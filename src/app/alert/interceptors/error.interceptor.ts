import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {EventManager} from "../event-manager.service";
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  private TOPIC: string = 'alert/error';

  constructor(private eventManager: EventManager) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .catch(err => {
        this.eventManager.broadcast(this.TOPIC, {
          type: 'error',
          message: err.error.message,
          paramMap: err.error.paramMap,
          statusText: err.statusText,
          fieldErrors: err.error.fieldErrors
        });
        return Observable.throw(err);
      });
  }
}
