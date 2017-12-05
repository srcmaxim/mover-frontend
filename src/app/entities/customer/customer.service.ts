import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Customer} from './';

@Injectable()
export class CustomerService {

  private resourceUrl = 'api/customers';

  constructor(private http: HttpClient) {
  }

  create(lead: Customer): Observable<Customer> {
    const copy: Customer = Object.assign({}, lead);
    return this.http.post<Customer>(this.resourceUrl, copy);
  }

  update(lead: Customer): Observable<Customer> {
    const copy: Customer = Object.assign({}, lead);
    return this.http.put<Customer>(this.resourceUrl, copy);
  }

  find(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.resourceUrl}/${id}`);
  }

  query(req?: any): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.resourceUrl);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.resourceUrl}/${id}`);
  }
}
