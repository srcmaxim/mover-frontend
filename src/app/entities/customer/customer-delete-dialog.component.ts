import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from "./customer.service";

@Component({
  selector: 'app-customer-delete-dialog',
  templateUrl: './customer-delete-dialog.component.html'
})
export class CustomerDeleteDialogComponent implements OnInit {

  private customerId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customerId = id;
      }
    });
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.customerService.delete(this.customerId).first().subscribe(() =>
      this.router.navigateByUrl('/customer'));
  }
}
