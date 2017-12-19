export class Estimate {
  name: string;
  quantity: number;
  price: number;

  constructor(obj: any) {
    this.name       = obj && obj.name       || '';
    this.quantity   = obj && obj.quantity   || 0;
    this.price      = obj && obj.price      || 0;
  }
}
