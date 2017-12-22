import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Lead, Status, Type} from "./lead.model";
import {Iso8601Date} from "../../shared/pipes/date.pipe";
import {EntityMapper} from "../entity.mapper.service";
import {Observable} from "rxjs/Observable";
import {Cast} from "../entity.cast.service";

/**
 * REST API for working with Lead resource.
 */
@Injectable()
export class LeadService {

  private resourceUrl = '/api/leads';
  private cast: Cast<Lead> = new Cast();
  private mapper: EntityMapper = new LeadMapper(new Iso8601Date());

  public multiCast: Observable<Lead[]> = this.cast.multiCast;
  public singleCast: Observable<Lead> = this.cast.singleCast;

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
