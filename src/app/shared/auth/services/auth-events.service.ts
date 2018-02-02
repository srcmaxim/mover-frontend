import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

/**
 * Works w/o rxjs because it sucks
 */
@Injectable()
export class AuthEventsService {

  private refreshCast: Subject<any> = new Subject();
  private logoutCast: Subject<any> = new Subject();

  public refreshEvent: Observable<any> = this.refreshCast.asObservable();
  public logoutEvent: Observable<any> = this.logoutCast.asObservable();

  public refresh() {
    this.refreshCast.next();
  }

  public logout() {
    this.logoutCast.next();
  }
}

