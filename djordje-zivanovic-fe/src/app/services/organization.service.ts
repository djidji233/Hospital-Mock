import { Injectable, resolveForwardRef } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Organization, OrganizationCreationModificationRequest } from '../models/organization.model';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";



@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  private readonly organizationUrl = 'http://localhost:8080/organization/'
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

  public fetchOrganizationById(organizationId: number): Observable<Organization> {
    return this.http.get<Organization>(
      this.organizationUrl + organizationId,
      {
        params: {},
        headers: {}
      }
    )
  }

  public createOrganization(request: OrganizationCreationModificationRequest): Observable<Organization> {
    const body = JSON.stringify(request)
    return this.http.post<Organization>(
      this.organizationUrl,
      body,
      {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  public updateOrganization(organizationId: number, request: OrganizationCreationModificationRequest): Observable<Organization> {
    const body = JSON.stringify(request)
    return this.http.patch<Organization>(
      this.organizationUrl + organizationId,
      body,
      {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  public deleteOrganization(organizationId: number): Observable<any> {
    return this.http.delete<any>(
      this.organizationUrl + organizationId
    )
  }

}
