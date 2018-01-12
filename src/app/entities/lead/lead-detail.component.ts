import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {ActivatedRoute} from "@angular/router";
import {CustomerService} from "../customer/customer.service";
import {LeadService} from "./lead.service";
import {Customer} from "../customer/customer.model";
import {Lead} from "./lead.model";
import {Employee} from "../employee/employee.model";
import {EmployeeService} from "../employee/employee.service";

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {

  private lead: Observable<Lead>;
  private leadId: number;

  constructor(private route: ActivatedRoute,
              private leadService: LeadService) {
  }

  ngOnInit() {
    this.route.params.take(1).subscribe((params) => {
      this.leadId = params['id'];
      if (this.leadId) {
        this.lead = this.leadService.singleCast;
        this.leadService.find(this.leadId).first().subscribe();
        this.leadService.queryEstimates(this.leadId).first().subscribe();
        this.leadService.queryInventories(this.leadId).first().subscribe();
       }
    });
  }
}
