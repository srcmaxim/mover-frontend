import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {Customer} from './';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class CustomerService {

  private resourceUrl = 'api/customers';
  private store: BehaviorSubject<Customer[]> = new BehaviorSubject([]);
  public change: Observable<Customer[]> = this.store.asObservable();

  constructor(private http: HttpClient) {
  }

  create(customer: Customer) {
    const copy: Customer = Object.assign({}, customer);
    this.http.post<Customer>(this.resourceUrl, copy)
      .subscribe((customer: Customer) => {
        customer = new Customer(customer);
        const customers: Customer[] = this.store.getValue();
        customers.push(customer);
        this.store.next(customers);
      });
  }

  update(customer: Customer) {
    const copy: Customer = Object.assign({}, customer);
    this.http.put<Customer>(this.resourceUrl, copy)
      .subscribe((customer: Customer) => {
        customer = new Customer(customer);
        const customers: Customer[] = this.store.getValue();
        customers.forEach((_: Customer, i) => {
          if (_.id == customer.id) {
            customers[i] = customer;
          }
        });
        this.store.next(customers);
      });
  }

  find(id: number) {
    this.http.get<Customer>(`${this.resourceUrl}/${id}`)
      .subscribe((customer: Customer) => {
        this.store.next([new Customer(customer)]);
      });
  }

  query(req?: any) {
    this.http.get<Customer[]>(this.resourceUrl)
      .subscribe((customers: Customer[]) => {
        customers.forEach((customer: Customer, i) => customers[i] = new Customer(customers[i]));
        this.store.next(customers);
      });
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        let customers: Customer[] = this.store.getValue();
        customers = customers.filter((customer: Customer) => customer.id != id);
        this.store.next(customers);
      });
  }
}
