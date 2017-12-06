import {Component, OnDestroy, OnInit} from '@angular/core';
import {Customer} from './';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "./customer.service";
import "rxjs/add/operator/map";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  private customer: Observable<Customer>;
  private changeSubscription: any;
  private routeSubscription: any;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customer = this.customerService.change
      .map((customers: Customer[]) => customers[0]);
    this.changeSubscription = this.customer.subscribe();

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customerService.find(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
}
