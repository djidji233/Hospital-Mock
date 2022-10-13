import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient, PatientCreationModificationRequest } from '../models/patient.model';

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

  public fetchPatientById(patientId: number): Observable<Patient> {
    return this.http.get<Patient>(
      this.patientUrl + patientId,
      {
        params: {},
        headers: {}
      }
    )
  }

  public createPatient(request: PatientCreationModificationRequest): Observable<Patient> {
    const body = JSON.stringify(request)
    return this.http.post<Patient>(
      this.patientUrl,
      body,
      {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  public updatePatient(patientId: number, request: PatientCreationModificationRequest): Observable<Patient> {
    const body = JSON.stringify(request)
    return this.http.patch<Patient>(
      this.patientUrl + patientId,
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
