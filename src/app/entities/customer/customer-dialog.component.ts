import {Component, OnInit} from '@angular/core';
import {Address, Lead} from '../lead/';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './customer-dialog.component.html',
  styleUrls: ['./customer-dialog.component.css']
})
export class CustomerDialogComponent implements OnInit {

  private leads: Lead[];

  constructor() {
    this.leads = [
      new Lead({
        start: new Date(),
        end: new Date(),
        origin: new Address('123, Brick st., LA', 0, 0),
        destination: new Address('123, Mac st., LA', 0, 0)
      }),
      new Lead({
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
