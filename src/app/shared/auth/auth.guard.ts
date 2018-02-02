import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {LocalStorage} from "./local-storage.decorator";
import {Token} from "./models/token.model";

@Injectable()
export class AuthGuard implements CanActivate {

  @LocalStorage
  private token: Token;

  constructor(private router: Router) {
  }

  canActivate(): boolean {
    if (this.token) {
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate([{outlets: {popup: 'login'}}]);
    return false;
  }
}
