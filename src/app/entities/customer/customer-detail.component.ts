import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "./customer.service";
import "rxjs/add/operator/map";
import {Lead} from "../lead/lead.model";
import {LeadService} from "../lead/lead.service";
import {HttpParams} from "@angular/common/http";
import {Customer} from "./customer.model";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  private customer: Observable<Customer>;
  private leads: Observable<Lead[]>;
  private routeSubscription: any;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.customer = this.customerService.singleChange;
    this.leads = this.leadService.multiChange;

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customerService.find(id);
      }
    });

    this.customer.subscribe((customer: Customer) => {
      let params = new HttpParams().set('customerId', String(customer.id));
      this.leadService.query({params});
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
