import { Observable, Observer, Subscription } from 'rxjs/Rx';
import {Subject} from "rxjs/Subject";
import {observable} from "rxjs/symbol/observable";

/**
 * EventManager allows publication/subscription on concrete topic.
 */
export class EventManager {
  private cast: Subject<any> = new Subject<any>();
  public observable: Observable<any> = this.cast.asObservable();
  public observer: Observer<any> = this.cast;

  public broadcast(topic: string, event: any): void {
    this.cast.next({topic: topic, event: event});
  }

  public subscribe(topic: string, callback: any): Subscription {
    return this.observable
      /* filters by containing suggested topic in event */
      .filter((event) => event.topic.includes(topic, 0))
      .subscribe(param => callback(param));
  }

  public destroy(subscriber: Subscription): void{
    observable.unsubscribe(subscriber);
  }
}
