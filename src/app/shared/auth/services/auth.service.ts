import {Inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Token} from "../models/token.model";
import {LocalStorage} from "../local-storage.decorator";
import {Observable} from "rxjs/Observable";
import {AuthEventsService} from "./auth-events.service";
import {Credentials} from "../models/credentials.model";

/**
 * AuthService must be initialized eager because
 * callback functions refresh and logout must be added to AuthEventsService.
 */
@Injectable()
export class AuthService {

  @LocalStorage
  private token: Token;

  public constructor(@Inject('URL_LOGIN') private loginUrl: string,
                     @Inject('URL_TOKEN') private tokenUrl: string,
                     private http: HttpClient,
                     private authEventsService: AuthEventsService) {
    this.authEventsService.refreshEvent.subscribe(() => this.refresh());
    this.authEventsService.logoutEvent.subscribe(() => this.logout());
  }

  public login(credentials: Credentials): Observable<Token> {
    return this.http.post(this.loginUrl, credentials)
      .map(token => this.token = new Token(token['token'], token['refreshToken']));
  }

  public refresh() {
    this.http.get<string>(this.tokenUrl)
      .first().subscribe((token: any) => {
      this.token = new Token(token.token, this.token.refreshToken);
    });
  }

  public logout() {
    this.token = null;
  }
}
