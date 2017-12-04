import {Component, OnInit} from '@angular/core';
import {
  Lead,
  Type,
  Status,
  Address
} from './';

@Component({
  selector: 'app-lead-detail',
  templateUrl: './lead-detail.component.html',
  styleUrls: ['./lead-detail.component.css']
})
export class LeadDetailComponent implements OnInit {

  private lead: Lead;
  private Type = Type;
  private Status = Status;

  constructor() {
    this.lead = new Lead({
      start: new Date(),
      end: new Date(),
      origin: new Address('123, Brick st., LA', 0, 0),
      destination: new Address('123, Mac st., LA', 0, 0),
      customerId: 1,
      assignedToIds: [1, 2, 3]
    });
  }

  ngOnInit() {
  }

}
