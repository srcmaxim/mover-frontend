import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Lead,
  Type,
  Status,
  Address
} from './';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {LeadService} from "./lead.service";

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit, OnDestroy {

  private lead: Observable<Lead>;
  private routeSubscription: any;

  constructor(private route: ActivatedRoute,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.lead = this.leadService.singleChange;

    this.routeSubscription = this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.leadService.find(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
}
