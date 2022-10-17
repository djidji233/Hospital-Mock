import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Examination, ExaminationCreationModificationRequest } from '../models/examination.model';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  private readonly examinationUrl = 'http://localhost:8080/examination/'
  private examinations: Observable<Examination[]>

  constructor(private http: HttpClient) {
    this.examinations = new Observable<[]>
  }

  getExaminations(): Observable<Examination[]> {
    return this.examinations;
  }

  public fetchExaminations(organizationId?: any, examinationStatus?: any): Observable<Examination[]> {
    let httpParams = new HttpParams()
    if (organizationId !== undefined) {
      httpParams = httpParams.append("organizationId", organizationId)
    }
    if (examinationStatus != undefined) {
      httpParams = httpParams.append("status", examinationStatus)
    }

    this.examinations = this.http.get<Examination[]>(
      this.examinationUrl,
      {
        params: httpParams
      }
    )
    return this.examinations;
  }

  public fetchExaminationById(examinationId: number): Observable<Examination> {
    return this.http.get<Examination>(
      this.examinationUrl + examinationId
    )
  }

  public createExamination(request: ExaminationCreationModificationRequest): Observable<Examination> {
    const body = JSON.stringify(request)
    return this.http.post<Examination>(
      this.examinationUrl,
      body,
      {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  public updateExamination(examinationId: number, request: ExaminationCreationModificationRequest): Observable<Examination> {
    const body = JSON.stringify(request)
    return this.http.patch<Examination>(
      this.examinationUrl + examinationId,
      body,
      {
        params: {},
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }

  public deleteExamination(examinationId: number): Observable<any> {
    return this.http.delete<any>(
      this.examinationUrl + examinationId
    )
  }

}
