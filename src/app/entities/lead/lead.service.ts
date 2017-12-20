import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Lead} from "./lead.model";

@Injectable()
export class LeadService {

  private resourceUrl = '/api/leads';
  private collection: BehaviorSubject<Lead[]> = new BehaviorSubject([]);
  private first: BehaviorSubject<Lead> = new BehaviorSubject(new Lead({}));
  public multiChange: Observable<Lead[]> = this.collection.asObservable();
  public singleChange: Observable<Lead> = this.first.asObservable();

  constructor(private http: HttpClient) {
  }

  create(lead: Lead) {
    const copy: Lead = Object.assign({}, lead);
    this.http.post<Lead>(this.resourceUrl, copy)
      .subscribe((lead: Lead) => {
        this.createSingle(lead);
        this.createMulti(lead);
      });
  }

  private createSingle(lead: Lead) {
    this.first.next(new Lead(lead));
  }

  private createMulti(lead: Lead) {
    lead = new Lead(lead);
    const leads: Lead[] = this.collection.getValue();
    leads.push(lead);
    this.collection.next(leads);
  }

  update(lead: Lead) {
    const copy: Lead = Object.assign({}, lead);
    this.http.put<Lead>(this.resourceUrl, copy)
      .subscribe(() => {
        this.updateSingle(lead);
        this.updateMulti(lead);
      });
  }

  private updateSingle(lead: Lead) {
    this.first.next(new Lead(lead));
  }

  private updateMulti(lead: Lead) {
    lead = new Lead(lead);
    const leads: Lead[] = this.collection.getValue();
    for (let i = 0; i < leads.length; i++) {
      if (leads[i].id == lead.id) {
        leads[i] = lead;
        break;
      }
    }
    this.collection.next(leads);
  }

  find(id: number) {
    this.http.get<Lead>(`${this.resourceUrl}/${id}`)
      .subscribe((lead: Lead) => {
        this.findSingle(lead);
      });
  }

  private findSingle(lead: Lead) {
    this.first.next(new Lead(lead));
  }

  query(req?: any) {
    this.http.get<Lead[]>(this.resourceUrl)
      .subscribe((leads: Lead[]) => {
        if (leads.length > 1) {
          this.queryMulti(leads);
        } else {
          this.querySingle(new Lead(leads[0]));
        }
      });
  }

  private querySingle(lead: Lead) {
    this.first.next(new Lead(lead));
  }

  private queryMulti(leads: Lead[]) {
    leads.forEach((lead: Lead, i) => leads[i] = new Lead(leads[i]));
    this.collection.next(leads);
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        this.deleteMulti(id);
        this.deleteSingle();
      });
  }

  private deleteSingle() {
    this.first.next(new Lead({}));
  }

  private deleteMulti(id: number) {
    let leads: Lead[] = this.collection.getValue();
    leads = leads.filter((lead: Lead) => lead.id != id);
    this.collection.next(leads);
  }
}
