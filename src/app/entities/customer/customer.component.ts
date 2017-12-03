import { Component, OnInit } from '@angular/core';
import {Customer} from './customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  private customers: Customer[];

  constructor() {
    this.customers = [
      new Customer({
        id: 1,
        firstName: 'Duglas',
        lastName: 'Costa',
        email: 'duglas-costa@gmail.com',
        phone: '+380-637-5413'
      }),
      new Customer({
        id: 2,
        firstName: 'Jerar',
        lastName: 'Pike',
        email: 'jerar.pike@gmail.com',
        phone: '+380-512-1718'
      })
    ];
  }

  ngOnInit() {
  }

}
