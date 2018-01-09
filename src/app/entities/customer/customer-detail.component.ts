import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "./customer.service";
import "rxjs/add/operator/map";
import {Lead} from "../lead/lead.model";
import {LeadService} from "../lead/lead.service";
import {Customer} from "./customer.model";
import "rxjs/add/operator/do";

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  private customer: Observable<Customer>;
  private customerId: number;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.route.params.take(1).subscribe((params) => {
      this.customerId = params['id'];
      if (this.customerId) {
        this.customer = this.customerService.singleCast;
        this.customerService.find(this.customerId).first().subscribe();
      }
    });
  }
}
