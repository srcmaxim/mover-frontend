import {Component, Input, OnChanges} from "@angular/core";
import {NavigationStart, Router} from "@angular/router";
import {EmployeeService} from "../../employee/employee.service";
import {Employee} from "../../employee/employee.model";
import {isUndefined} from "util";

@Component({
  selector: 'app-employee-entity-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: []
})
export class EmployeeEntityDetailComponent implements OnChanges {

  @Input() private leadId: number;
  private employees: Employee[];
  private url: RegExp = /^\/lead\/\d$/;

  constructor(private router: Router,
              private employeeService: EmployeeService) {
    this.queryEmployeesWhenNavigationStarts(router);
  }

  private queryEmployeesWhenNavigationStarts(router: Router) {
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
      this.employeeService.queryByLeadId({id: this.leadId}).first()
        .subscribe((employees: Employee[]) => this.employees = employees);
    }
  }

  remove(employeeId: number) {
    if (this.isLeadIdLoaded()) {
      this.employeeService.removeConnectionEmployeeLead(employeeId, this.leadId).first()
        .subscribe(() => this.query());
    }
  }

  private isLeadIdLoaded() {
    return !isUndefined(this.leadId) && this.leadId != null;
  }
}
