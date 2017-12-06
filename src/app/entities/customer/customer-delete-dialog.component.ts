import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomerService} from "./customer.service";

@Component({
  selector: 'app-customer-delete-dialog',
  templateUrl: './customer-delete-dialog.component.html'
})
export class CustomerDeleteDialogComponent implements OnInit, OnDestroy {

  private customerId: number;
  private routeSubscription: any;
  private deleteSubscription: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private customerService: CustomerService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customerId = id;
      }
    });
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.customerService.delete(this.customerId);
    this.deleteSubscription = this.customerService.change.subscribe(() =>
      this.router.navigateByUrl('/customer'));
  }
}
