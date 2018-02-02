import {Authority} from "./authority.model";

export class User {

  constructor(public username: string,
              public authorities: Array<Authority>) {
  }
}
