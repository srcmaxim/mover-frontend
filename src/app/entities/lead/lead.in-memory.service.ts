import {InMemoryDbService} from "angular-in-memory-web-api";
import {Address, Category, Estimate, Inventory, Lead, Status, Type} from "./";

export class InMemoryLeadService implements InMemoryDbService {
  createDb() {
    let leads = [
      new Lead({
        id: 1,
        start: new Date(),
        end: new Date(),
        origin: new Address('123, Brick st., LA', 0, 0),
        destination: new Address('123, Mac st., LA', 0, 0),
        type: Type.LOCAL,
        status: Status.ASSIGNED,
        customerId: 1,
        assignedToIds: [1, 2],
        estimates: [
          new Estimate({
            id: 1,
            name: 'Packing Paper',
            quantity: 1,
            price: 120
          }),
          new Estimate({
            id: 2,
            name: 'Big Box',
            quantity: 3,
            price: 175.50
          })
        ],
        inventories: [
          new Inventory({
            id: 1,
            category: Category.DINNING,
            name: 'Table',
            quantity: 1,
            weight: 20,
            volume: 15
          }),
          new Inventory({
            id: 1,
            category: Category.KITCHEN,
            name: 'Fridge',
            quantity: 1,
            weight: 100.2,
            volume: 20
          })
        ]
      }),
      new Lead({
        id: 2,
        start: new Date(),
        end: new Date(),
        origin: new Address('27, Tree st., LA', 0, 0),
        destination: new Address('413, Oak st., LA', 0, 0),
        type: Type.DISTANCE,
        status: Status.CONVERTED,
        customerId: 1,
        assignedToIds: [1, 2],
        estimates: [
          new Estimate({
            id: 1,
            name: 'Packing Stripe',
            quantity: 1,
            price: 100
          }),
          new Estimate({
            id: 2,
            name: 'Small Box',
            quantity: 1,
            price: 125.50
          })
        ],
        inventories: [
          new Inventory({
            id: 1,
            category: Category.DINNING,
            name: 'Table',
            quantity: 1,
            weight: 20,
            volume: 15
          }),
          new Inventory({
            id: 1,
            category: Category.KITCHEN,
            name: 'Fridge',
            quantity: 1,
            weight: 100.2,
            volume: 20
          })
        ]
      })
    ];
    return {leads};
  }
}
