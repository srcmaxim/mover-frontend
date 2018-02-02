import {Inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user.model";
import {AuthEventsService} from "./auth-events.service";

@Injectable()
export class UserService {

  constructor(@Inject('URL_WHOAMI') private whoamiUrl: string,
              private http: HttpClient,
              private authEventsService: AuthEventsService) {
  }

  whoami(): Observable<User> {
    return this.http.get(this.whoamiUrl)
      .map((user: string) => JSON.parse(user));
  }
}
