import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Lead} from './';

@Component({
  selector: 'app-lead-delete-dialog',
  templateUrl: './lead-delete-dialog.component.html'
})
export class LeadDeleteDialogComponent implements OnInit, OnDestroy {

  routeSub: any;
  lead: Lead;

  constructor(private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.lead = new Lead({id: id});
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

