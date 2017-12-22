import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SemanticCalendarLoader, SemanticDropdownLoader} from '../../layouts';
import {CustomerService} from "./customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "./customer.model";

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  private customer: FormGroup;

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private calendarLoader: SemanticCalendarLoader,
              private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private formBuilder: FormBuilder) {
    this.initForm(new Customer({}));
  }

  ngOnInit() {
    this.dropdownLoader.load();
    this.calendarLoader.load();

    this.route.params.first().subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customerService.find(id).first()
          .subscribe((customer: Customer) => this.initForm(customer));
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

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    if (this.customer.value.id) {
      this.customerService.update(this.customer.value)
        .first().subscribe(() => this.onDeny());
    } else {
      this.customerService.create(this.customer.value)
        .first().subscribe(() => this.onDeny());
    }
  }
}
