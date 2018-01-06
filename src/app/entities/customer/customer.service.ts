import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Customer} from "./customer.model";
import {EntityMapper} from "../entity.mapper.service";
import {EntityCast} from "../entity.cast.service";

/**
 * REST API for working with Customer resource.
 */
@Injectable()
export class CustomerService {

  private resourceUrl = '/api/customers';
  private cast: EntityCast<Customer> = new EntityCast();
  private mapper: EntityMapper = new CustomerMapper();

  public multiCast: Observable<Customer[]> = this.cast.multiCast;
  public singleCast: Observable<Customer> = this.cast.singleCast;

  constructor(private http: HttpClient) {
  }

  create(customer: Customer): Observable<Customer> {
    let copy = this.mapper.fromEntityToService(customer);
    return this.http.post<Customer>(this.resourceUrl, copy)
      .map((customer: any) => this.mapper.fromServiceToEntity(customer))
      .do((customer: Customer) => this.cast.create(customer));
  }

  update(customer: Customer): Observable<Customer> {
    let copy = this.mapper.fromEntityToService(customer);
    return this.http.put<Customer>(this.resourceUrl, copy)
      .map(() => customer)
      .do((customer: Customer) => this.cast.update(customer));
  }

  find(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.resourceUrl}/${id}`)
      .map((customer: any) => this.mapper.fromServiceToEntity(customer))
      .do((customer: Customer) => this.cast.find(customer));
  }

  query(req?: any): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.resourceUrl)
      .map((customers: any[]) => customers
        .map((customer: any) => this.mapper.fromServiceToEntity(customer)))
      .do((customers: Customer[]) => this.cast.query(customers));
  }

  delete(id: number): Observable<number> {
    return this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .map(() => id)
      .do((id: number) => this.cast.delete(id));
  }

  /* ENTITY */

  findByLeadId(req?: any): Observable<Customer[]> {
    return this.http.get<Customer>(`/api/leads/${req.id}/customer`)
      .map((customer: any) => this.mapper.fromServiceToEntity(customer))
      .do((customer: Customer) => this.cast.find(customer));
  }
}

/**
 * Maps Customer REST API to Customer entity and vice versa.
 */
export class CustomerMapper implements EntityMapper {

  fromServiceToEntity(customer: any): Customer {
    let copy = Object.assign({}, customer);
    return new Customer(copy);
  }

  fromEntityToService(customer: Customer): any {
    let copy: any = Object.assign({}, customer);
    return copy;
  }
}

