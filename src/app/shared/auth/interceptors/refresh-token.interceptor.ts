import {AuthEventsService} from "../services/auth-events.service";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Inject, Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/empty";

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {


  constructor(@Inject('URL_TOKEN') private tokenUrl: string,
              private authEventsService: AuthEventsService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).catch(err => {
      /* if exception happened during request,
       * refreshes token with refreshToken
       */
      if (err.statusText == 'Unauthorized') {
        this.authEventsService.refresh();
      }
      /* if exception happened during token refreshing
       * with refreshToken, makes logout
       */
      if (this.tokenUrl == req.url) {
        this.authEventsService.logout();
      }
      return Observable.throw(err);
    });
  }
}
