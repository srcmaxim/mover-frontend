import {Inject, Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Token} from "../models/token.model";
import {LocalStorage} from "../local-storage.decorator";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  @LocalStorage
  private token: Token;

  constructor(@Inject('URL_TOKEN') private tokenUrl: string) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.token) {
      return next.handle(
        req.clone({
          setHeaders: {'Authorization': `Bearer ${this.getAuthToken(req)}`}
        })
      );
    } else {
      return next.handle(req);
    }
  }

  /**
   *  Uses refreshToken if new token is needed,
   *  uses token when process all other requests.
   */
  private getAuthToken(req: HttpRequest<any>) {
    return (this.tokenUrl === req.url)
      ? this.token.refreshToken : this.token.token;
  }
}
