import {Component, OnInit} from '@angular/core';
import {
  Lead,
  Type,
  Status,
  Address
} from './';

@Component({
  selector: 'app-lead',
  templateUrl: './lead.component.html'
})
export class LeadComponent implements OnInit {

  private leads: Lead[];
  private Type = Type;
  private Status = Status;

  constructor() {
    this.leads = [
      new Lead({
        id: 1,
        start: new Date(),
        end: new Date(),
        origin: new Address('123, Brick st., LA', 0, 0),
        destination: new Address('123, Mac st., LA', 0, 0)
      }),
      new Lead({
        id: 2,
        start: new Date(),
        end: new Date(),
        origin: new Address('27, Tree st., LA', 0, 0),
        destination: new Address('413, Oak st., LA', 0, 0)
      })
    ];
  }

  ngOnInit() {
  }

}
