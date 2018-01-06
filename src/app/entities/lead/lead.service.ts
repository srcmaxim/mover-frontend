import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lead, Status, Type} from "./lead.model";
import {Iso8601Date} from "../../shared/pipes/date.pipe";
import {EntityMapper} from "../entity.mapper.service";
import {Observable} from "rxjs/Observable";
import {EntityCast} from "../entity.cast.service";
import {Estimate} from "./estimate.model";
import {Category, Inventory} from "./inventory.model";
import {EmbeddedCast} from "../embedded.cast.service";

/**
 * REST API for working with Lead resource.
 */
@Injectable()
export class LeadService {

  private resourceUrl = '/api/leads';

  private cast: EntityCast<Lead> = new EntityCast();
  private mapper: EntityMapper = new LeadMapper(new Iso8601Date());

  private castEstimate: EmbeddedCast<Estimate> = new EmbeddedCast();
  private castInventory: EmbeddedCast<Inventory> = new EmbeddedCast();
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

  queryEstimates(leadId: number): Observable<Estimate[]> {
    return this.http.get<Estimate[]>(`${this.resourceUrl}/${leadId}/estimates`)
      .map((estimates: any[]) => estimates
          .map((estimate: any) => this.estimateMapper.fromServiceToEntity(estimate)))
      .do((estimates: Estimate[]) => this.castEstimate.query(estimates));
  }

  createEstimate(leadId: number, estimate: Estimate): Observable<Estimate[]> {
    const cast =  this.castEstimate.create(estimate);
    return this.updateEstimatesResource(leadId, cast);
  }

  updateEstimate(leadId: number, index: number, estimate: Estimate): Observable<Estimate[]> {
    const cast =  this.castEstimate.update(index, estimate);
    return this.updateEstimatesResource(leadId, cast);
  }

  deleteEstimate(leadId: number, index: number): Observable<Estimate[]> {
    const cast = this.castEstimate.delete(index);
    return this.updateEstimatesResource(leadId, cast);
  }

  private updateEstimatesResource(leadId: number, estimates: Observable<Estimate[]> ): Observable<Estimate[]>  {
    return estimates.map((estimates: Estimate[]) => estimates
      .map((estimate: Estimate) => this.estimateMapper.fromEntityToService(estimate)))
      .do((copy: any) => this.http.put<Estimate[]>(`${this.resourceUrl}/${leadId}/estimates`, copy).first().subscribe());
  }

  queryInventories(leadId: number): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(`${this.resourceUrl}/${leadId}/inventories`)
      .map((inventories: any[]) => inventories
        .map((inventory: any) => this.inventoryMapper.fromServiceToEntity(inventory)))
      .do((inventories: Inventory[]) => this.castInventory.query(inventories));
  }

  createInventory(leadId: number, inventory: Inventory): Observable<Inventory[]> {
    const cast = this.castInventory.create(inventory);
    return this.updateInventoriesResource(leadId, cast);
  }

  updateInventory(leadId: number, index: number, inventory: Inventory): Observable<Inventory[]> {
    const cast =  this.castInventory.update(index, inventory);
    return this.updateInventoriesResource(leadId, cast);
  }

  deleteInventory(leadId: number, index: number): Observable<Inventory[]> {
    const cast = this.castInventory.delete(index);
    return this.updateInventoriesResource(leadId, cast);
  }

  private updateInventoriesResource(leadId: number, inventories: Observable<Inventory[]> ): Observable<Inventory[]>  {
    return inventories.map((inventories: Inventory[]) => inventories
      .map((inventory: Inventory) => this.inventoryMapper.fromEntityToService(inventory)))
      .do((copy: any) => this.http.put<Inventory[]>(`${this.resourceUrl}/${leadId}/inventories`, copy).first().subscribe());
  }

  /* ENTITY */

  queryByCustomerId(req?: any): Observable<Lead[]> {
    return this.http.get<Lead[]>(`/api/customers/${req.id}/leads`)
      .map((leads: any[]) => leads
        .map((lead: any) => this.mapper.fromServiceToEntity(lead)))
      .do((leads: Lead[]) => this.cast.query(leads));
  }

  queryByEmployeeId(req?: any): Observable<Lead[]> {
    return this.http.get<Lead[]>(`/api/employees/${req.id}/leads`)
      .map((leads: any[]) => leads
        .map((lead: any) => this.mapper.fromServiceToEntity(lead)))
      .do((leads: Lead[]) => this.cast.query(leads));
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
