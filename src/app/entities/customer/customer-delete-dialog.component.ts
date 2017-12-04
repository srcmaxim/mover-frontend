import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from './customer.model';

@Component({
  selector: 'app-customer-delete-dialog',
  templateUrl: './customer-delete-dialog.component.html'
})
export class CustomerDeleteDialogComponent implements OnInit, OnDestroy {

  routeSub: any;
  customer: Customer;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customer = new Customer({id: id});
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.router.navigate([{outlets: {popup: null}}]);
  }
}
