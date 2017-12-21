import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Customer} from "./customer.model";
import {EntityMapper} from "../entity.mapper.service";
import {EntityUpdater} from "../entity.updater.service";

/**
 * REST API for working with Customer resource.
 */
@Injectable()
export class CustomerService {

  private resourceUrl = '/api/customers';
  private customerUpdater: EntityUpdater<Customer> = new EntityUpdater();
  private customerMapper: CustomerMapper = new CustomerMapper();

  public multiChange: Observable<Customer[]> = this.customerUpdater.multiChange;
  public singleChange: Observable<Customer> = this.customerUpdater.singleChange;

  constructor(private http: HttpClient) {
  }

  create(customer: Customer) {
    let copy = this.customerMapper.fromEntityToService(customer);
    this.http.post<Customer>(this.resourceUrl, copy)
      .subscribe((customer: any) => {
        let newCustomer: Customer = this.customerMapper.fromServiceToEntity(customer);
        this.customerUpdater.create(newCustomer);
      });
  }

  update(customer: Customer) {
    let copy = this.customerMapper.fromEntityToService(customer);
    this.http.put<Customer>(this.resourceUrl, copy)
      .subscribe(() => {
        this.customerUpdater.update(customer);
      });
  }

  find(id: number) {
    this.http.get<Customer>(`${this.resourceUrl}/${id}`)
      .subscribe((customer: any) => {
        let newCustomer: Customer = this.customerMapper.fromServiceToEntity(customer);
        this.customerUpdater.findSingle(newCustomer);
      });
  }

  query(req?: any) {
    this.http.get<Customer[]>(this.resourceUrl)
      .subscribe((customers: any[]) => {
        let newCustomers: Customer[] = customers.map((customer: any) => this.customerMapper.fromServiceToEntity(customer));
        this.customerUpdater.query(newCustomers);
      });
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        this.customerUpdater.delete(id);
      });
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

