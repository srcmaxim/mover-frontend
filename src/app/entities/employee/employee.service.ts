import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Employee} from "./employee.model";
import {EntityMapper} from "../entity.mapper.service";
import {EntityUpdater} from "../entity.updater.service";

/**
 * REST API for working with Employee resource.
 */
@Injectable()
export class EmployeeService {

  private resourceUrl = '/api/employees';
  private employeeUpdater: EntityUpdater<Employee> = new EntityUpdater();
  private employeeMapper: EmployeeMapper = new EmployeeMapper();

  public multiChange: Observable<Employee[]> = this.employeeUpdater.multiChange;
  public singleChange: Observable<Employee> = this.employeeUpdater.singleChange;

  constructor(private http: HttpClient) {
  }

  create(employee: Employee) {
    let copy = this.employeeMapper.fromEntityToService(employee);
    this.http.post<Employee>(this.resourceUrl, copy)
      .subscribe((employee: any) => {
        let newEmployee: Employee = this.employeeMapper.fromServiceToEntity(employee);
        this.employeeUpdater.create(newEmployee);
      });
  }

  update(employee: Employee) {
    let copy = this.employeeMapper.fromEntityToService(employee);
    this.http.put<Employee>(this.resourceUrl, copy)
      .subscribe(() => {
        this.employeeUpdater.update(employee);
      });
  }

  find(id: number) {
    this.http.get<Employee>(`${this.resourceUrl}/${id}`)
      .subscribe((employee: any) => {
        let newEmployee: Employee = this.employeeMapper.fromServiceToEntity(employee);
        this.employeeUpdater.findSingle(newEmployee);
      });
  }

  query(req?: any) {
    this.http.get<Employee[]>(this.resourceUrl)
      .subscribe((employees: any[]) => {
        let newEmployees: Employee[] = employees.map((employee: any) => this.employeeMapper.fromServiceToEntity(employee));
        this.employeeUpdater.query(newEmployees);
      });
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        this.employeeUpdater.delete(id);
      });
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
