import {Component, Input, OnInit} from "@angular/core";
import {Estimate} from "../estimate.model";
import {LeadService} from "../lead.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-estimate-detail',
  templateUrl: './estimate-detail.component.html',
  styleUrls: []
})
export class EstimateDetailComponent implements OnInit {

  @Input() private leadId: number;
  private estimates: Observable<Estimate[]>;

  constructor(private leadService: LeadService) {
  }

  ngOnInit() {
    this.estimates = this.leadService.multiCastEstimates;
  }

  query() {
    this.leadService.queryEstimates(this.leadId).first().subscribe();
  }

  edit(index: number) {
    alert("edit " + index);
  }

  delete(index: number) {
    this.leadService.deleteEstimate(this.leadId, index).first().subscribe();
  }
}
