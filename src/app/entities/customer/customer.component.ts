import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {CustomerService} from "./customer.service";
import {Customer} from "./customer.model";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  private customers: Observable<Customer[]>;

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customers = this.customerService.multiCast;
    this.customerService.query().first().subscribe();
  }
}
