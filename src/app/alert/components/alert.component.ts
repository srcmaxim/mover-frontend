import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventManager} from "../event-manager.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit, OnDestroy {
  private alerts: any[] = [];
  private sub: Subscription;
  private JSON = JSON;

  constructor(private eventManager: EventManager) {
  }

  ngOnInit() {
    this.sub = this.eventManager
      .subscribe('alert', (alert) => this.add(alert.event));
  }

  ngOnDestroy(): void {
    this.eventManager.destroy(this.sub);
  }

  add(alert) {
    this.alerts.push(alert);
    window.setTimeout(() => {
      this.remove(alert);
    }, 5 * 1000);
  }

  remove(alert: any) {
    this.alerts = this.alerts.filter(_ => _ != alert)
  }
}
