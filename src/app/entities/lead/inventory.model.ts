export class Inventory {
  category: Category;
  name: string;
  quantity: number;
  weight: number;
  volume: number;

  constructor(obj?: any) {
    this.category   = obj && obj.category   || Category.ANY;
    this.name       = obj && obj.name       || '';
    this.quantity   = obj && obj.quantity   || 0;
    this.weight     = obj && obj.weight     || 0;
    this.volume     = obj && obj.volume     || 0;
  }

  getCategoryToString(): string {
    return Category[this.category];
  }
}

export enum Category {
  ANY, LIVING, BED, OFFICE, KITCHEN, BATH, ATTIC, DINNING, BASEMENT
}
