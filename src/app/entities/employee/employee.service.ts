import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Employee} from './';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class EmployeeService {

  private resourceUrl = 'api/employees';
  private store: BehaviorSubject<Employee[]> = new BehaviorSubject([]);
  public change: Observable<Employee[]> = this.store.asObservable();

  constructor(private http: HttpClient) {
  }

  create(employee: Employee) {
    const copy: Employee = Object.assign({}, employee);
    this.http.post<Employee>(this.resourceUrl, copy)
      .subscribe((employee: Employee) => {
        const employees: Employee[] = this.store.getValue();
        employees.push(employee);
        this.store.next(employees);
      });
  }

  update(employee: Employee) {
    const copy: Employee = Object.assign({}, employee);
    this.http.put<Employee>(this.resourceUrl, copy)
      .subscribe((employee: Employee) => {
        const employees: Employee[] = this.store.getValue();
        employees.forEach((_, i) => {
          if (_.id == employee.id) {
            employees[i] = employee;
          }
        });
        this.store.next(employees);
      });
  }

  find(id: number) {
    this.http.get<Employee>(`${this.resourceUrl}/${id}`)
      .subscribe((employee: Employee) => {
        this.store.next([employee]);
      });
  }

  query(req?: any) {
    this.http.get<Employee[]>(this.resourceUrl)
      .subscribe((employees: Employee[]) => {
        this.store.next(employees);
      });
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        let employees: Employee[] = this.store.getValue();
        employees = employees.filter(_ => _.id != id);
        this.store.next(employees);
      });
  }
}
