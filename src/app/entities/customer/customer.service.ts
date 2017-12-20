import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Customer} from "./customer.model";

@Injectable()
export class CustomerService {

  private resourceUrl = '/api/customers';
  private collection: BehaviorSubject<Customer[]> = new BehaviorSubject([]);
  private first: BehaviorSubject<Customer> = new BehaviorSubject(new Customer({}));
  public multiChange: Observable<Customer[]> = this.collection.asObservable();
  public singleChange: Observable<Customer> = this.first.asObservable();

  constructor(private http: HttpClient) {
  }

  create(customer: Customer) {
    const copy: Customer = Object.assign({}, customer);
    this.http.post<Customer>(this.resourceUrl, copy)
      .subscribe((customer: Customer) => {
        this.createSingle(customer);
        this.createMulti(customer);
      });
  }

  private createSingle(customer: Customer) {
    this.first.next(new Customer(customer));
  }

  private createMulti(customer: Customer) {
    customer = new Customer(customer);
    const customers: Customer[] = this.collection.getValue();
    customers.push(customer);
    this.collection.next(customers);
  }

  update(customer: Customer) {
    const copy: Customer = Object.assign({}, customer);
    this.http.put<Customer>(this.resourceUrl, copy)
      .subscribe(() => {
        this.updateSingle(customer);
        this.updateMulti(customer);
      });
  }

  private updateSingle(customer: Customer) {
    this.first.next(new Customer(customer));
  }

  private updateMulti(customer: Customer) {
    customer = new Customer(customer);
    const customers: Customer[] = this.collection.getValue();
    for (let i = 0; i < customers.length; i++) {
      if (customers[i].id == customer.id) {
        customers[i] = customer;
        break;
      }
    }
    this.collection.next(customers);
  }

  find(id: number) {
    this.http.get<Customer>(`${this.resourceUrl}/${id}`)
      .subscribe((customer: Customer) => {
        this.findSingle(customer);
      });
  }

  private findSingle(customer: Customer) {
    this.first.next(new Customer(customer));
  }

  query(req?: any) {
    this.http.get<Customer[]>(this.resourceUrl)
      .subscribe((customers: Customer[]) => {
        if (customers.length > 1) {
          this.queryMulti(customers);
        } else {
          this.querySingle(new Customer(customers[0]));
        }
      });
  }

  private querySingle(customer: Customer) {
    this.first.next(new Customer(customer));
  }

  private queryMulti(customers: Customer[]) {
    customers.forEach((customer: Customer, i) => customers[i] = new Customer(customers[i]));
    this.collection.next(customers);
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        this.deleteMulti(id);
        this.deleteSingle();
      });
  }

  private deleteSingle() {
    this.first.next(new Customer({}));
  }

  private deleteMulti(id: number) {
    let customers: Customer[] = this.collection.getValue();
    customers = customers.filter((customer: Customer) => customer.id != id);
    this.collection.next(customers);
  }
}
