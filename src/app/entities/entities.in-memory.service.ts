import {InMemoryDbService} from "angular-in-memory-web-api";
import {Customer} from "./customer";
import {Address, Lead, Type, Status} from "./lead/lead.model";
import {Estimate} from "./lead/estimate.model";
import {Category, Inventory} from "./lead/inventory.model";
import {Employee} from "./employee/employee.model";

export class InMemoryEntitiesService implements InMemoryDbService {
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
    let customers = [
      new Customer({
        id: 1,
        firstName: 'Duglas',
        lastName: 'Costa',
        email: 'duglas-costa@gmail.com',
        phone: '+380-637-5413',
        leadIds: [1]
      }),
      new Customer({
        id: 2,
        firstName: 'Jerar',
        lastName: 'Pike',
        email: 'jerar.pike@gmail.com',
        phone: '+380-512-1718',
        leadIds: [2]
      })
    ];
    let employees = [
      new Employee({
        id: 1,
        firstName: 'Sesk',
        lastName: 'Fabrigas',
        email: 'sesk_fabrigas@gmail.com',
        phone: '+380-333-2013',
        leadsIds: [1]
      }),
      new Employee({
        id: 2,
        firstName: 'Samuel',
        lastName: 'Untity',
        email: 'samuel.untity@gmail.com',
        phone: '+380-314-1515',
        leadsIds: [2]
      })
    ];
    return {leads, customers, employees};
  }
}
