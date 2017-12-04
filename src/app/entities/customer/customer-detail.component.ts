import {Component, OnInit} from '@angular/core';
import {Customer} from './';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit {

  private customer: Customer;

  constructor() {
    this.customer = new Customer({
      firstName: 'Duglas',
      lastName: 'Costa',
      email: 'duglas-costa@gmail.com',
      phone: '+380-637-5413',
      leadIds: [1, 2, 3]
    });
  }

  ngOnInit() {
  }

}
