import {Estimate} from "../estimate.model";
import {LeadService} from "../lead.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Component, OnInit} from "@angular/core";
import index from "@angular/cli/lib/cli";

@Component({
  selector: 'app-estimate-dialog',
  templateUrl: './estimate-dialog.component.html',
  styleUrls: []
})
export class EstimateDialogComponent implements OnInit {

  private estimate: FormGroup;
  private id: number;
  private index: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private leadService: LeadService,
              private formBuilder: FormBuilder) {
    this.initForm(new Estimate({}));
  }

  ngOnInit() {
    this.route.params.first().subscribe((params) => {
      this.id = params['id'];
      this.index = params['index'];
      if (this.index) {
        this.leadService.multiCastEstimates.first()
          .map((estimates: Estimate[]) => estimates[this.index])
          .subscribe((estimate: Estimate) => this.initForm(estimate));
      }
    });
  }

  initForm(estimate: Estimate) {
    this.estimate = this.formBuilder.group({
      name: estimate.name,
      quantity: estimate.quantity,
      price: estimate.price
    });
  }

  onDeny() {
    this.router.navigate([{outlets: {popup: null}}]);
  }

  onApprove() {
    if (this.index) {
      this.leadService.updateEstimate(this.id, this.index, new Estimate(this.estimate.value))
        .first().subscribe(() => this.onDeny());
    } else {
      this.leadService.createEstimate(this.id, new Estimate(this.estimate.value))
        .first().subscribe(() => this.onDeny());
    }
  }
}
