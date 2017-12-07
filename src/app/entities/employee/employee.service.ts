import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Employee} from './';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class EmployeeService {

  private resourceUrl = 'api/employees';
  private collection: BehaviorSubject<Employee[]> = new BehaviorSubject([]);
  private first: BehaviorSubject<Employee> = new BehaviorSubject(new Employee({}));
  public multiChange: Observable<Employee[]> = this.collection.asObservable();
  public singleChange: Observable<Employee> = this.first.asObservable();

  constructor(private http: HttpClient) {
  }

  create(employee: Employee) {
    const copy: Employee = Object.assign({}, employee);
    this.http.post<Employee>(this.resourceUrl, copy)
      .subscribe((employee: Employee) => {
        this.createSingle(employee);
        this.createMulti(employee);
      });
  }

  private createSingle(employee: Employee) {
    this.first.next(new Employee(employee));
  }

  private createMulti(employee: Employee) {
    employee = new Employee(employee);
    const employees: Employee[] = this.collection.getValue();
    employees.push(employee);
    this.collection.next(employees);
  }

  update(employee: Employee) {
    const copy: Employee = Object.assign({}, employee);
    this.http.put<Employee>(this.resourceUrl, copy)
      .subscribe(() => {
        this.updateSingle(employee);
        this.updateMulti(employee);
      });
  }

  private updateSingle(employee: Employee) {
    this.first.next(new Employee(employee));
  }

  private updateMulti(employee: Employee) {
    employee = new Employee(employee);
    const employees: Employee[] = this.collection.getValue();
    for (let i = 0; i < employees.length; i++) {
      if (employees[i].id == employee.id) {
        employees[i] = employee;
        break;
      }
    }
    this.collection.next(employees);
  }

  find(id: number) {
    this.http.get<Employee>(`${this.resourceUrl}/${id}`)
      .subscribe((employee: Employee) => {
        this.findSingle(employee);
      });
  }

  private findSingle(employee: Employee) {
    this.first.next(new Employee(employee));
  }

  query(req?: any) {
    this.http.get<Employee[]>(this.resourceUrl)
      .subscribe((employees: Employee[]) => {
        if (employees.length > 1) {
          this.queryMulti(employees);
        } else {
          this.querySingle(new Employee(employees[0]));
        }
      });
  }

  private querySingle(employee: Employee) {
    this.first.next(new Employee(employee));
  }

  private queryMulti(employees: Employee[]) {
    employees.forEach((employee: Employee, i) => employees[i] = new Employee(employees[i]));
    this.collection.next(employees);
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        this.deleteMulti(id);
        this.deleteSingle();
      });
  }

  private deleteSingle() {
    this.first.next(new Employee({}));
  }

  private deleteMulti(id: number) {
    let employees: Employee[] = this.collection.getValue();
    employees = employees.filter((employee: Employee) => employee.id != id);
    this.collection.next(employees);
  }
}
