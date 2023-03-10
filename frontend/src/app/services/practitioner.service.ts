import { Injectable, resolveForwardRef } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Practitioner, PractitionerCreationModificationRequest } from '../models/practitioner.model';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Organization } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class PractitionerService {

  private readonly practitionerUrl = 'http://localhost:8080/practitioner/'
  private practitioners: Observable<Practitioner[]>

  constructor(private http: HttpClient) {
    this.practitioners = new Observable<[]>
  }

  public getPractitioners(): Observable<Practitioner[]> {
    return this.practitioners
  }

  public fetchPractitioners(organizationId?: any): Observable<Practitioner[]> {
    let httpParams = new HttpParams()
    if (organizationId !== undefined) {
      httpParams = httpParams.append("organizationId", organizationId)
    }

    this.practitioners = this.http.get<Practitioner[]>(
      this.practitionerUrl,
      {
        params: httpParams
      }
    )

    return this.practitioners;
  }

  public fetchPractitionerById(practitionerId: number): Observable<Practitioner> {
    return this.http.get<Practitioner>(
      this.practitionerUrl + practitionerId,
      {
        params: {},
        headers: {}
      }
    )
  }

  public createPractitioner(request: PractitionerCreationModificationRequest): Observable<Practitioner> {
    const body = JSON.stringify(request)
    return this.http.post<Practitioner>(
      this.practitionerUrl,
      body,
      {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  public updatePractitioner(practitionerId: number, request: PractitionerCreationModificationRequest): Observable<Practitioner> {
    const body = JSON.stringify(request)
    return this.http.patch<Practitioner>(
      this.practitionerUrl + practitionerId,
      body,
      {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  public deletePractitioner(practitionerId: number): Observable<any> {
    return this.http.delete<any>(
      this.practitionerUrl + practitionerId
    )
  }

}
