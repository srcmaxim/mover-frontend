import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Lead} from './';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class LeadService {

  private resourceUrl = 'api/leads';
  private store: BehaviorSubject<Lead[]> = new BehaviorSubject([]);
  public change: Observable<Lead[]> = this.store.asObservable();

  constructor(private http: HttpClient) {
  }

  create(lead: Lead) {
    const copy: Lead = Object.assign({}, lead);
    this.http.post<Lead>(this.resourceUrl, copy)
      .subscribe((lead: Lead) => {
        const leads: Lead[] = this.store.getValue();
        leads.push(lead);
        this.store.next(leads);
      });
  }

  update(lead: Lead) {
    const copy: Lead = Object.assign({}, lead);
    this.http.put<Lead>(this.resourceUrl, copy)
      .subscribe((lead: Lead) => {
        const leads: Lead[] = this.store.getValue();
        leads.forEach((_, i) => {
          if (_.id == lead.id) {
            leads[i] = lead;
          }
        });
        this.store.next(leads);
      });
  }

  find(id: number) {
    this.http.get<Lead>(`${this.resourceUrl}/${id}`)
      .subscribe((lead: Lead) => {
        this.store.next([lead]);
      });
  }

  query(req?: any) {
    this.http.get<Lead[]>(this.resourceUrl)
      .subscribe((leads: Lead[]) => {
        this.store.next(leads);
      });
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        let leads: Lead[] = this.store.getValue();
        leads = leads.filter(_ => _.id != id);
        this.store.next(leads);
      });
  }
}
