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
  private leads: Observable<Lead[]>;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.route.params.take(1).subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customer = this.customerService.singleCast;
        this.leads = this.leadService.multiCast;

        this.customerService.find(id).first().subscribe();
        this.leadService.queryByCustomerId({id: id}).first().subscribe();
      }
    });
  }
}
