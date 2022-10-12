import { Injectable, resolveForwardRef } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Practitioner } from '../models/practitioner.model';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";

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

}
