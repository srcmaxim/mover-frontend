import {Component, Input, OnChanges} from "@angular/core";
import {LeadService} from "../../lead/lead.service";
import {Lead} from "../../lead/lead.model";
import {CustomerService} from "../customer.service";
import {isUndefined} from "util";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-lead-entity-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: []
})
export class LeadEntityDetailComponent implements OnChanges {

  @Input() private customerId: number;
  private leads: Lead[];
  private url: RegExp = /^\/customer\/\d$/;

  constructor(private router: Router,
              private leadService: LeadService,
              private customerService: CustomerService) {
    this.queryLeadsWhenNavigationStarts(router);
  }

  private queryLeadsWhenNavigationStarts(router: Router) {
    router.events
      .filter(() => this.isCustomerIdLoaded())
      .filter(event => event instanceof NavigationStart)
      .map((event: NavigationStart) => event.url)
      .filter((url: string) => this.url.test(url))
      .subscribe((url: string) => this.query());
  }

  ngOnChanges() {
    this.query();
  }

  query() {
    if (this.isCustomerIdLoaded()) {
      this.leadService.queryByCustomerId({id: this.customerId}).first()
        .subscribe((leads: Lead[]) => this.leads = leads);
    }
  }

  remove(leadId: number) {
    if (this.isCustomerIdLoaded()) {
      this.customerService.removeConnectionCustomerLead(this.customerId, leadId).first()
        .subscribe(() => this.query());
    }
  }

  private isCustomerIdLoaded() {
    return !isUndefined(this.customerId) && this.customerId != null;
  }
}
