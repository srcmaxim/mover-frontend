import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Lead} from './';

@Injectable()
export class LeadService {

  private resourceUrl = 'api/leads';

  constructor(private http: HttpClient) {
  }

  create(lead: Lead): Observable<Lead> {
    const copy: Lead = Object.assign({}, lead);
    return this.http.post<Lead>(this.resourceUrl, copy);
  }

  update(lead: Lead): Observable<Lead> {
    const copy: Lead = Object.assign({}, lead);
    return this.http.put<Lead>(this.resourceUrl, copy);
  }

  find(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.resourceUrl}/${id}`);
  }

  query(req?: any): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.resourceUrl);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.resourceUrl}/${id}`);
  }
}
