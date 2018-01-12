import {Component, Input, OnChanges} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";
import {CustomerService} from "../../customer/customer.service";
import {Customer} from "../../customer/customer.model";
import {isUndefined} from "util";

@Component({
  selector: 'app-customer-entity-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: []
})
export class CustomerEntityDetailComponent implements OnChanges {

  @Input() private leadId: number;
  private customer: Customer;
  private url: RegExp = /^\/lead\/\d$/;

  constructor(private router: Router,
              private customerService: CustomerService) {
    this.queryCustomersWhenNavigationStarts(router);
  }

  private queryCustomersWhenNavigationStarts(router: Router) {
    router.events
      .filter(() => this.isLeadIdLoaded())
      .filter(event => event instanceof NavigationStart)
      .map((event: NavigationStart) => event.url)
      .filter((url: string) => this.url.test(url))
      .subscribe((url: string) => this.query());
  }

  ngOnChanges() {
    this.query();
  }

  query() {
    if (this.isLeadIdLoaded()) {
      this.customerService.findByLeadId({id: this.leadId}).first()
        .subscribe((customer: Customer) => this.customer = customer);
    }
  }

  remove(customerId: number) {
    if (this.isLeadIdLoaded()) {
      this.customerService.removeConnectionCustomerLead(customerId, this.leadId).first()
        .subscribe(() => this.query());
    }
  }

  private isLeadIdLoaded() {
    return !isUndefined(this.leadId) && this.leadId != null;
  }
}
