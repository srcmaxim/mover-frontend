import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LeadService} from "./lead.service";

@Component({
  selector: 'app-lead-delete-dialog',
  templateUrl: './lead-delete-dialog.component.html'
})
export class LeadDeleteDialogComponent implements OnInit, OnDestroy {

  private leadId: number;
  private routeSubscription: any;
  private deleteSubscription: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leadId = id;
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
    this.leadService.delete(this.leadId);
    this.deleteSubscription = this.leadService.multiChange.subscribe(() =>
      this.router.navigateByUrl('/lead'));
  }
}

