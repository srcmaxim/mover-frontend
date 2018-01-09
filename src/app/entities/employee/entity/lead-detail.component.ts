import {Component, Input, OnChanges} from "@angular/core";
import {LeadService} from "../../lead/lead.service";
import {Lead} from "../../lead/lead.model";
import {EmployeeService} from "../employee.service";
import {isUndefined} from "util";
import {NavigationStart, Router} from "@angular/router";

@Component({
  selector: 'app-lead-entity-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: []
})
export class LeadEntityDetailComponent implements OnChanges {

  @Input() private employeeId: number;
  private leads: Lead[];
  private url: RegExp = /^\/employee\/\d$/;

  constructor(private router: Router,
              private leadService: LeadService,
              private employeeService: EmployeeService) {
    this.queryLeadsWhenNavigationStarts(router);
  }

  private queryLeadsWhenNavigationStarts(router: Router) {
    router.events
      .filter(() => this.isEmployeeIdLoaded())
      .filter(event => event instanceof NavigationStart)
      .map((event: NavigationStart) => event.url)
      .filter((url: string) => this.url.test(url))
      .subscribe((url: string) => this.query());
  }

  ngOnChanges() {
    this.query();
  }

  query() {
    if (this.isEmployeeIdLoaded()) {
      this.leadService.queryByEmployeeId({id: this.employeeId}).first()
        .subscribe((leads: Lead[]) => this.leads = leads);
    }
  }

  remove(leadId: number) {
    if (this.isEmployeeIdLoaded()) {
      this.employeeService.removeConnectionEmployeeLead(this.employeeId, leadId).first()
        .subscribe(() => this.query());
    }
  }

  private isEmployeeIdLoaded() {
    return !isUndefined(this.employeeId) && this.employeeId != null;
  }
}
