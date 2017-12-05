import {Component, OnInit} from '@angular/core';
import {
  Lead,
  Type,
  Status,
  LeadService
} from './';
import {Observable} from "rxjs/Observable";

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
    this.leads = this.leadService.query();
    this.leads.subscribe(
      data => console.log(JSON.stringify(data))
    );
  }
}
