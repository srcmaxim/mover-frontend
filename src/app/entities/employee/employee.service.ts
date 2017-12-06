import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Employee} from './';

@Injectable()
export class EmployeeService {

  private resourceUrl = 'api/employees';

  constructor(private http: HttpClient) {
  }

  create(lead: Employee): Observable<Employee> {
    const copy: Employee = Object.assign({}, lead);
    return this.http.post<Employee>(this.resourceUrl, copy);
  }

  update(lead: Employee): Observable<Employee> {
    const copy: Employee = Object.assign({}, lead);
    return this.http.put<Employee>(this.resourceUrl, copy);
  }

  find(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.resourceUrl}/${id}`);
  }

  query(req?: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.resourceUrl);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete<Response>(`${this.resourceUrl}/${id}`);
  }
}
