import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private readonly patientUrl = 'http://localhost:8080/patient/'
  private patients: Observable<Patient[]>

  constructor(private http: HttpClient) {
    this.patients = new Observable<[]>
  }

  getPatients(): Observable<Patient[]> {
    return this.patients;
  }

  public fetchPatients(): Observable<Patient[]> {
    this.patients = this.http.get<Patient[]>(
      this.patientUrl,
      {
        params: {},
        headers: {}
      }
    )
    return this.patients;
  }

}
