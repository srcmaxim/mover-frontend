import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lead, Status, Type} from "./lead.model";
import {Iso8601Date} from "../../shared/pipes/date.pipe";
import {EntityMapper} from "../entity.mapper.service";
import {Observable} from "rxjs/Observable";
import {Cast} from "../entity.cast.service";
import {Estimate} from "./estimate.model";
import {Category, Inventory} from "./inventory.model";

/**
 * REST API for working with Lead resource.
 */
@Injectable()
export class LeadService {

  private resourceUrl = '/api/leads';

  private cast: Cast<Lead> = new Cast();
  private mapper: EntityMapper = new LeadMapper(new Iso8601Date());

  private castEstimate: Cast<Estimate> = new Cast();
  private castInventory: Cast<Inventory> = new Cast();
  private estimateMapper: EntityMapper = new EstimateMapper();
  private inventoryMapper: EntityMapper = new InventoryMapper();

  public multiCast: Observable<Lead[]> = this.cast.multiCast;
  public singleCast: Observable<Lead> = this.cast.singleCast;

  public multiCastEstimates: Observable<Estimate[]> = this.castEstimate.multiCast;
  public multiCastInventories: Observable<Inventory[]> = this.castInventory.multiCast;

  constructor(private http: HttpClient) {
  }

  create(lead: Lead): Observable<Lead> {
    let copy = this.mapper.fromEntityToService(lead);
    return this.http.post<Lead>(this.resourceUrl, copy)
      .map((lead: any) => this.mapper.fromServiceToEntity(lead))
      .do((lead: Lead) => this.cast.create(lead));
  }

  update(lead: Lead): Observable<Lead> {
    let copy = this.mapper.fromEntityToService(lead);
    return this.http.put<Lead>(this.resourceUrl, copy)
      .map(() => lead)
      .do((lead: Lead) => this.cast.update(lead));
  }

  find(id: number): Observable<Lead> {
    return this.http.get<Lead>(`${this.resourceUrl}/${id}`)
      .map((lead: any) => this.mapper.fromServiceToEntity(lead))
      .do((lead: Lead) => this.cast.find(lead));
  }

  query(req?: any): Observable<Lead[]> {
    return this.http.get<Lead[]>(this.resourceUrl)
      .map((leads: any[]) => leads
        .map((lead: any) => this.mapper.fromServiceToEntity(lead)))
      .do((leads: Lead[]) => this.cast.query(leads));
  }

  delete(id: number): Observable<number> {
    return this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .map(() => id)
      .do((id: number) => this.cast.delete(id));
  }

  /* EMBEDDED */

  findEstimates(leadId: number): Observable<Estimate[]> {
    return this.http.get<Estimate[]>(`${this.resourceUrl}/${leadId}/estimates`)
      .map((estimates: any[]) => estimates
        .map((estimate: any) => this.estimateMapper.fromServiceToEntity(estimate)))
      .do((estimates: Estimate[]) => this.castEstimate.query(estimates));
  }

  updateEstimates(leadId: number, estimates: Estimate[]): Observable<Estimate[]> {
    let copy = this.mapper.fromEntityToService(estimates);
    return this.http.put<Estimate[]>(`${this.resourceUrl}/${leadId}/estimates`, copy)
      .map(() => estimates)
      .do((estimates: Estimate[]) => this.castEstimate.query(estimates));
  }


  findInventories(leadId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.resourceUrl}/${leadId}/inventories`)
      .map((inventories: any[]) => inventories
        .map((inventory: any) => this.inventoryMapper.fromServiceToEntity(inventory)))
      .do((inventories: Inventory[]) => this.castInventory.query(inventories));
  }

  updateInventories(leadId: number, inventories: Inventory[]): Observable<Inventory[]> {
    let copy = this.mapper.fromEntityToService(inventories);
    return this.http.put<Inventory[]>(`${this.resourceUrl}/${leadId}/inventories`, copy)
      .map(() => inventories)
      .do((inventories: Inventory[]) => this.castInventory.query(inventories));
  }
}

/**
 * Maps Lead REST API to Lead entity and vice versa.
 */
export class LeadMapper implements EntityMapper {

  constructor(private iso8601Date: Iso8601Date) {
  }

  fromServiceToEntity(lead: any): Lead {
    let copy = Object.assign({}, lead);

    copy.start = new Date(copy.start);
    copy.end = new Date(copy.end);
    copy.type = Type[copy.type];
    copy.status = Status[copy.status];

    return new Lead(copy);
  }

  fromEntityToService(lead: Lead): any {
    let copy: any = Object.assign({}, lead);

    copy.start = this.iso8601Date.transform(copy.start);
    copy.end = this.iso8601Date.transform(copy.end);
    copy.type = Type[copy.type];
    copy.status = Status[copy.status];

    return copy;
  }
}

/**
 * Maps Estimate REST API to Estimate entity and vice versa.
 */
export class EstimateMapper implements EntityMapper {

  fromServiceToEntity(estimate: any): Estimate {
    let copy = Object.assign({}, estimate);

    return new Estimate(copy);
  }

  fromEntityToService(estimate: Estimate): any {
    let copy: any = Object.assign({}, estimate);

    return copy;
  }
}

/**
 * Maps Inventory REST API to Inventory entity and vice versa.
 */
export class InventoryMapper implements EntityMapper {

  fromServiceToEntity(inventory: any): Inventory {
    let copy = Object.assign({}, inventory);

    copy.category = Category[copy.category];

    return new Inventory(copy);
  }

  fromEntityToService(inventory: Inventory): any {
    let copy: any = Object.assign({}, inventory);

    copy.category = Category[copy.category];

    return copy;
  }
}
