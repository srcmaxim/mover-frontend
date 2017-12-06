import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lead} from '../lead/';
import {Employee} from '../employee';
import {SemanticCalendarLoader, SemanticDropdownLoader} from '../../layouts';
import {FormBuilder, FormGroup} from "@angular/forms";
import {EmployeeService} from "./employee.service";

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit, OnDestroy {

  private employee: FormGroup;
  private leads: Lead[];
  private routeSubscription: any;
  private createSubscription: any;

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private calendarLoader: SemanticCalendarLoader,
              private route: ActivatedRoute,
              private router: Router,
              private employeeService: EmployeeService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dropdownLoader.load();
    this.calendarLoader.load();

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
      } else {
        this.initForm(new Employee({}));
        this.leads = [];
      }
    });
  }

  initForm(employee: Employee) {
    this.employee = this.formBuilder.group({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email,
      phone: employee.phone
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.createSubscription) {
      this.createSubscription.unsubscribe();
    }
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    if (this.employee.value.id) {
    } else {
      this.employeeService.create(this.employee.value);
    }
    this.createSubscription = this.employeeService.change.subscribe(() =>
      this.router.navigateByUrl('/employee'));
  }
}
