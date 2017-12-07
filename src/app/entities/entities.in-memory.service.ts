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
            id: 2,
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
        destination: new Address('413, Apple st., LA', 0, 0),
        type: Type.DISTANCE,
        status: Status.CONVERTED,
        customerId: 2,
        assignedToIds: [2],
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
            id: 2,
            category: Category.KITCHEN,
            name: 'Fridge',
            quantity: 1,
            weight: 100.2,
            volume: 20
          })
        ]
      }),
      new Lead({
        id: 3,
        start: new Date(),
        end: new Date(),
        origin: new Address('27, Cherry st., LA', 0, 0),
        destination: new Address('413, Villon st., LA', 0, 0),
        type: Type.DISTANCE,
        status: Status.CLOSED,
        customerId: 3,
        assignedToIds: [3],
        estimates: [
          new Estimate({
            id: 1,
            name: 'Velcro',
            quantity: 1,
            price: 10
          }),
          new Estimate({
            id: 2,
            name: 'Big Box',
            quantity: 1,
            price: 200
          })
        ],
        inventories: [
          new Inventory({
            id: 1,
            category: Category.LIVING,
            name: 'Audio system',
            quantity: 4,
            weight: 5,
            volume: 5
          }),
          new Inventory({
            id: 2,
            category: Category.LIVING,
            name: 'Shelves',
            quantity: 4,
            weight: 75,
            volume: 25
          })
        ]
      }),
      new Lead({
        id: 3,
        start: new Date(),
        end: new Date(),
        origin: new Address('42, Marshmallow st., LA', 0, 0),
        destination: new Address('15, Cherry st., LA', 0, 0),
        type: Type.DISTANCE,
        status: Status.CONVERTED,
        customerId: 3,
        assignedToIds: [3],
        estimates: [
          new Estimate({
            id: 1,
            name: 'Small Box',
            quantity: 3,
            price: 125.50
          })
        ],
        inventories: [
          new Inventory({
            id: 1,
            category: Category.OFFICE,
            name: 'Lamp',
            quantity: 1,
            weight: 20,
            volume: 15
          }),
          new Inventory({
            id: 2,
            category: Category.OFFICE,
            name: 'Computer',
            quantity: 10,
            weight: 3,
            volume: 2
          })
        ]
      }),
      new Lead({
        id: 4,
        start: new Date(),
        end: new Date(),
        origin: new Address('27, Pine st., LA', 0, 0),
        destination: new Address('413, Orange st., LA', 0, 0),
        type: Type.DISTANCE,
        status: Status.CONVERTED,
        customerId: 4,
        assignedToIds: [4],
        estimates: [
          new Estimate({
            id: 1,
            name: 'Packing Stripe',
            quantity: 3,
            price: 100
          }),
          new Estimate({
            id: 2,
            name: 'Small Box',
            quantity: 5,
            price: 125.50
          })
        ],
        inventories: [
          new Inventory({
            id: 1,
            category: Category.KITCHEN,
            name: 'Table',
            quantity: 1,
            weight: 20,
            volume: 15
          }),
          new Inventory({
            id: 2,
            category: Category.KITCHEN,
            name: 'Fridge',
            quantity: 1,
            weight: 100.2,
            volume: 20
          })
        ]
      }),
      new Lead({
        id: 5,
        start: new Date(),
        end: new Date(),
        origin: new Address('15, Glass st., LA', 0, 0),
        destination: new Address('73, Sand st., LA', 0, 0),
        type: Type.LOCAL,
        status: Status.ASSIGNED,
        customerId: 5,
        assignedToIds: [5],
        estimates: [
          new Estimate({
            id: 1,
            name: 'Packing Stripe',
            quantity: 3,
            price: 100
          }),
          new Estimate({
            id: 2,
            name: 'Small Box',
            quantity: 3,
            price: 125.50
          })
        ],
        inventories: [
          new Inventory({
            id: 1,
            category: Category.DINNING,
            name: 'Table',
            quantity: 2,
            weight: 20,
            volume: 15
          }),
          new Inventory({
            id: 1,
            category: Category.KITCHEN,
            name: 'Fridge',
            quantity: 3,
            weight: 100.2,
            volume: 20
          })
        ]
      }),
      new Lead({
        id: 6,
        start: new Date(),
        end: new Date(),
        origin: new Address('27, Tree st., LA', 0, 0),
        destination: new Address('413, Oak st., LA', 0, 0),
        type: Type.DISTANCE,
        status: Status.CONVERTED,
        customerId: 6,
        assignedToIds: [6],
        estimates: [
          new Estimate({
            id: 1,
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
            id: 2,
            category: Category.BED,
            name: 'Bed',
            quantity: 2,
            weight: 50,
            volume: 20
          }),
          new Inventory({
            id: 3,
            category: Category.LIVING,
            name: 'Lamp',
            quantity: 5,
            weight: 3,
            volume: 2
          }),
          new Inventory({
            id: 4,
            category: Category.ANY,
            name: 'Weights',
            quantity: 1,
            weight: 3,
            volume: 1
          })
        ]
      }),
      new Lead({
        id: 7,
        start: new Date(),
        end: new Date(),
        origin: new Address('51, Pineapple st., LA', 0, 0),
        destination: new Address('84, Oak st., LA', 0, 0),
        type: Type.DISTANCE,
        status: Status.CONVERTED,
        customerId: 7,
        assignedToIds: [7],
        estimates: [],
        inventories: [
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
      }),
      new Customer({
        id: 3,
        firstName: 'Andrey',
        lastName: 'Pyatov',
        email: 'andrey_pyatov@gmail.com',
        phone: '+380-724-8251',
        leadIds: [3]
      }),
      new Customer({
        id: 4,
        firstName: 'David',
        lastName: 'Vilia',
        email: 'david.vilia@yahoo.com',
        phone: '+380-624-9369',
        leadIds: [4]
      }),
      new Customer({
        id: 5,
        firstName: 'David',
        lastName: 'Alama',
        email: 'david.alama@gmail.com',
        phone: '+926-168-8471',
        leadIds: [5]
      }),
      new Customer({
        id: 6,
        firstName: 'Tomas',
        lastName: 'Muller',
        email: 'tomas.muller@yandex.com',
        phone: '+836-873-9573',
        leadIds: [6]
      }),
      new Customer({
        id: 7,
        firstName: 'Robert',
        lastName: 'Levandovski',
        email: 'robert.levandovski@gmail.com',
        phone: '+343-888-1718',
        leadIds: [7]
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
        phone: '+380-624-9363',
        leadsIds: [2]
      }),
      new Employee({
        id: 3,
        firstName: 'Frank',
        lastName: 'Ribery',
        email: 'frank.ribary@yahoo.com',
        phone: '+234-873-9992',
        leadsIds: [3]
      }),
      new Employee({
        id: 4,
        firstName: 'Alexandr',
        lastName: 'Kokorin',
        email: 'alexands.kokorin@yandex.com',
        phone: '+563-314-9269',
        leadsIds: [4]
      }),
      new Employee({
        id: 5,
        firstName: 'Andrey',
        lastName: 'Shevchenko',
        email: 'andrey.shevchenko@gmail.com',
        phone: '+834-835-7242',
        leadsIds: [5]
      }),
      new Employee({
        id: 6,
        firstName: 'Andrey',
        lastName: 'Arshavin',
        email: 'andrey.arshavin@yandex.com',
        phone: '+324-723-1523',
        leadsIds: [6]
      }),
      new Employee({
        id: 7,
        firstName: 'Bast',
        lastName: 'Dost',
        email: 'bast.dost@yahoo.com',
        phone: '+678-936-9080',
        leadsIds: [7]
      })
    ];
    return {leads, customers, employees};
  }
}
