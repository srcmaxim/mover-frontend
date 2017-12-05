import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lead} from './';
import {
  SemanticCalendarLoader,
  SemanticDropdownLoader
} from '../../layouts/';
import {Employee} from '../employee/';
import {Customer} from '../customer/';

@Component({
  selector: 'app-lead-dialog',
  templateUrl: './lead-dialog.component.html',
  styleUrls: ['./lead-dialog.component.css']
})
export class LeadDialogComponent implements OnInit, OnDestroy {

  routeSub: any;
  lead: Lead;
  employees: Employee[];
  customers: Customer[];

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
        this.lead = new Lead({id: id});
        this.customers = [
          new Customer({
            id: 1,
            firstName: 'Duglas',
            lastName: 'Costa',
            email: 'duglas-costa@gmail.com',
            phone: '+380-637-5413'
          }),
          new Customer({
            id: 2,
            firstName: 'Jerar',
            lastName: 'Pike',
            email: 'jerar.pike@gmail.com',
            phone: '+380-512-1718'
          })
        ];
        this.employees = [
          new Employee({
            id: 1,
            firstName: 'Sesk',
            lastName: 'Fabrigas',
            email: 'sesk_fabrigas@gmail.com',
            phone: '+380-333-2013'
          }),
          new Employee({
            id: 2,
            firstName: 'Samuel',
            lastName: 'Untity',
            email: 'samuel.untity@gmail.com',
            phone: '+380-314-1515'
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
