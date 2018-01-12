import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subject} from "rxjs/Subject";
import "rxjs/add/operator/switch";
import {Customer} from "../../customer/customer.model";
import {CustomerService} from "../../customer/customer.service";

@Component({
  selector: 'app-customer-change-dialog',
  templateUrl: './customer-change-dialog.component.html',
  styleUrls: ['./customer-change-dialog.component.css']
})
export class CustomerChangeDialogComponent implements OnInit {

  private leadId: number;
  private query: FormGroup;
  private customers: Subject<Customer[]> = new Subject();
  private event: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      this.leadId = params['id'];
    });
    this.query = this.formBuilder.group({
      customer: ''
    });
    this.event
      .map(query => query.value.customer)
      .filter((query: string) => query.length > 2)
      .debounceTime(250)
      //todo: query by string
      .map((query: string) => this.customerService.query())
      .switch()
      .subscribe((customers: Customer[]) => this.customers.next(customers));
  }

  onChange() {
    this.event.next(this.query);
  }

  add(customerId: number) {
    this.customerService.addConnectionCustomerLead(customerId, this.leadId).first().subscribe();
  }

  onClose() {
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
