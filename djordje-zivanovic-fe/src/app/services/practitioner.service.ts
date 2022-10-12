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

  public fetchPractitioners(): Observable<Practitioner[]> {
    this.practitioners = this.http.get<Practitioner[]>(
      this.practitionerUrl,
      {
        params: {},
        headers: {}
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

}
