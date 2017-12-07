import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lead} from '../lead/';
import {SemanticCalendarLoader, SemanticDropdownLoader} from '../../layouts';
import {CustomerService} from "./customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "./customer.model";

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit, OnDestroy {

  private customer: FormGroup;
  private leads: Lead[];
  private routeSubscription: any;
  private editSubscription: any;

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private calendarLoader: SemanticCalendarLoader,
              private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.dropdownLoader.load();
    this.calendarLoader.load();

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customerService.find(id);
        this.customerService.change.subscribe((customers: Customer[]) => {
          this.initForm(customers[0]);
        });
      } else {
        this.initForm(new Customer({}));
        this.leads = [];
      }
    });
  }

  initForm(customer: Customer) {
    this.customer = this.formBuilder.group({
      id: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.email,
      phone: customer.phone
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.editSubscription) {
      this.editSubscription.unsubscribe();
    }
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    if (this.customer.value.id) {
      this.customerService.update(this.customer.value);
    } else {
      this.customerService.create(this.customer.value);
    }
    this.editSubscription = this.customerService.change.subscribe(() =>
      this.router.navigateByUrl('/customer'));
  }
}
