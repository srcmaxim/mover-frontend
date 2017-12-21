import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lead, Status, Type} from "./lead.model";
import {Iso8601Date} from "../../shared/pipes/date.pipe";
import {EntityMapper} from "../entity.mapper.service";
import {EntityUpdater} from "../entity.updater.service";
import {Observable} from "rxjs/Observable";

/**
 * REST API for working with Lead resource.
 */
@Injectable()
export class LeadService {

  private resourceUrl = '/api/leads';
  private leadUpdater: EntityUpdater<Lead> = new EntityUpdater();
  private leadMapper: LeadMapper = new LeadMapper(new Iso8601Date());

  public multiChange: Observable<Lead[]> = this.leadUpdater.multiChange;
  public singleChange: Observable<Lead> = this.leadUpdater.singleChange;

  constructor(private http: HttpClient) {
  }

  create(lead: Lead) {
    let copy = this.leadMapper.fromEntityToService(lead);
    this.http.post<Lead>(this.resourceUrl, copy)
      .subscribe((lead: any) => {
        let newLead: Lead = this.leadMapper.fromServiceToEntity(lead);
        this.leadUpdater.create(newLead);
      });
  }

  update(lead: Lead) {
    let copy = this.leadMapper.fromEntityToService(lead);
    this.http.put<Lead>(this.resourceUrl, copy)
      .subscribe(() => {
        this.leadUpdater.update(lead);
      });
  }

  find(id: number) {
    this.http.get<Lead>(`${this.resourceUrl}/${id}`)
      .subscribe((lead: any) => {
        let newLead: Lead = this.leadMapper.fromServiceToEntity(lead);
        this.leadUpdater.findSingle(newLead);
      });
  }

  query(req?: any) {
    this.http.get<Lead[]>(this.resourceUrl)
      .subscribe((leads: any[]) => {
        let newLeads: Lead[] = leads.map((lead: any) => this.leadMapper.fromServiceToEntity(lead));
        this.leadUpdater.query(newLeads);
      });
  }

  delete(id: number) {
    this.http.delete<Response>(`${this.resourceUrl}/${id}`)
      .subscribe(() => {
        this.leadUpdater.delete(id);
      });
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
