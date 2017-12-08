import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LeadService} from "./lead.service";
import {Lead, Type, Status} from "./lead.model";

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html'
})
export class LeadComponent implements OnInit {

  private leads: Observable<Lead[]>;
  private Type = Type;
  private Status = Status;

  constructor(private leadService: LeadService) {
  }

  ngOnInit() {
    this.leads = this.leadService.multiChange;
    this.leadService.query();
  }
}
