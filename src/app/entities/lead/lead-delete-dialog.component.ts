import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LeadService} from "./lead.service";

@Component({
  selector: 'app-lead-delete-dialog',
  templateUrl: './lead-delete-dialog.component.html'
})
export class LeadDeleteDialogComponent implements OnInit, OnDestroy {

  routeSub: any;
  leadId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leadId = id;
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
    this.leadService.delete(this.leadId);
    this.leadService.change.subscribe(() =>
      this.router.navigate([{outlets: {popup: null}}]));
  }
}

