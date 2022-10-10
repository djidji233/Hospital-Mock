import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization } from '../models/organization.model';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private readonly organizationUrl = 'http://localhost:8080/organization'
  private organizations: Observable<Organization[]>

  constructor(private http: HttpClient) {
    this.organizations = new Observable<[]>()
  }

  public getOrganizations(): Observable<Organization[]> {
    return this.organizations;
  }

  public fetchOrganizations(): Observable<Organization[]> {
    this.organizations = this.http.get<Organization[]>(
      this.organizationUrl,
      {
        params: {},
        headers: {}
      }
    )
    return this.organizations;
  }

}
