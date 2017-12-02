export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  leadIds: number[];

  constructor(obj: any) {
    this.id         = obj && obj.id         || null;
    this.firstName  = obj && obj.firstName  || '';
    this.lastName   = obj && obj.lastName   || '';
    this.email      = obj && obj.email      || '';
    this.phone      = obj && obj.phone      || '';
    this.leadIds    = obj && obj.leadIds    || [];
  }
}
