import {Estimate} from './estimate.model';
import {Inventory} from './inventory.model';

export class Lead {
  private static DATE_FORMAT_OPTIONS = {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false
  };

  id: number;
  start: Date;
  end: Date;
  origin: Address;
  destination: Address;
  type: Type;
  status: string;
  customerId: number;
  assignedToIds: number[];
  estimates: Estimate[];
  inventories: Inventory[];

  constructor(obj: any) {
    this.id             = obj && obj.id             || null;
    this.start          = obj && obj.start          || new Date();
    this.end            = obj && obj.end            || new Date();
    this.origin         = obj && obj.origin         || new Address('', 0, 0);
    this.destination    = obj && obj.destination    || new Address('', 0, 0);
    this.type           = obj && obj.type           || Type.LOCAL;
    this.status         = obj && obj.status         || Status.PENDING;
    this.customerId     = obj && obj.customerId     || null;
    this.assignedToIds  = obj && obj.assignedToIds  || [];
    this.estimates      = obj && obj.estimates      || [];
    this.inventories    = obj && obj.inventories    || [];
  }

  public getEnd(): string {
    return this.end.toLocaleString('eu', Lead.DATE_FORMAT_OPTIONS);
  }

  public getStart(): string {
    return this.start.toLocaleString('eu', Lead.DATE_FORMAT_OPTIONS);
  }
}

export class Address {
  constructor(public address: string,
              longitude: number,
              latitude: number) {
  }
}

export enum Type {
  LOCAL, DISTANCE
}

export enum Status {
  PENDING, ASSINGED, QUALIFIED, CONVERTED, CLOSED
}
