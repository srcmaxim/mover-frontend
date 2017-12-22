import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LeadService} from "./lead.service";

@Component({
  selector: 'app-lead-delete-dialog',
  templateUrl: './lead-delete-dialog.component.html'
})
export class LeadDeleteDialogComponent implements OnInit {

  private leadId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leadId = id;
      }
    });
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    this.leadService.delete(this.leadId).first().subscribe(() =>
      this.router.navigateByUrl('/customer'));
  }
}

