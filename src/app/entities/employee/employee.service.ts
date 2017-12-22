import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Employee} from "./employee.model";
import {EntityMapper} from "../entity.mapper.service";
import {Cast} from "../entity.cast.service";

/**
 * REST API for working with Employee resource.
 */
@Injectable()
export class EmployeeService {

  private resourceUrl = '/api/employees';
  private cast: Cast<Employee> = new Cast();
  private mapper: EntityMapper = new EmployeeMapper();


  public multiCast: Observable<Employee[]> = this.cast.multiCast;
  public singleCast: Observable<Employee> = this.cast.singleCast;

  constructor(private http: HttpClient) {
  }

  create(employee: Employee): Observable<Employee> {
    let copy = this.mapper.fromEntityToService(employee);
    return this.http.post<Employee>(this.resourceUrl, copy)
      .map((employee: any) => this.mapper.fromServiceToEntity(employee))
      .do((employee: Employee) => this.cast.create(employee));
  }

  update(employee: Employee): Observable<Employee> {
    let copy = this.mapper.fromEntityToService(employee);
    return this.http.put<Employee>(this.resourceUrl, copy)
      .map(() => employee)
      .do((employee: Employee) => this.cast.update(employee));
  }

  find(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.resourceUrl}/${id}`)
      .map((employee: any) => this.mapper.fromServiceToEntity(employee))
      .do((employee: Employee) => this.cast.find(employee));
  }

  query(req?: any): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.resourceUrl)
      .map((employees: any[]) => employees
        .map((employee: any) => this.mapper.fromServiceToEntity(employee)))
      .do((employees: Employee[]) => this.cast.query(employees));
  }

  delete(id: number): Observable<number> {
    return this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .map(() => id)
      .do((id: number) => this.cast.delete(id));
  }
}

/**
 * Maps Employee REST API to Employee entity and vice versa.
 */
export class EmployeeMapper implements EntityMapper {

  fromServiceToEntity(employee: any): Employee {
    let copy = Object.assign({}, employee);
    return new Employee(copy);
  }

  fromEntityToService(employee: Employee): any {
    let copy: any = Object.assign({}, employee);
    return copy;
  }
}
