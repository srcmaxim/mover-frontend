import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  Address,
  Lead
} from '../lead/';
import {Customer} from '../customer';
import {
  SemanticDropdownLoader,
  SemanticCalendarLoader
} from '../../layouts';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit, OnDestroy {

  routeSub: any;
  customer: Customer;
  private leads: Lead[];

  constructor(private dropdownLoader: SemanticDropdownLoader,
              private calendarLoader: SemanticCalendarLoader,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.dropdownLoader.load();
    this.calendarLoader.load();

    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.customer = new Customer({id: id});
        this.leads = [
          new Lead({
            start: new Date(),
            end: new Date(),
            origin: new Address('123, Brick st., LA', 0, 0),
            destination: new Address('123, Mac st., LA', 0, 0)
          }),
          new Lead({
            start: new Date(),
            end: new Date(),
            origin: new Address('27, Tree st., LA', 0, 0),
            destination: new Address('413, Oak st., LA', 0, 0)
          })
        ];
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
