import { HttpClient } from '@angular/common/http';
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

  public fetchExaminations(): Observable<Examination[]> {
    this.examinations = this.http.get<Examination[]>(
      this.examinationUrl,
      {
        params: {},
        headers: {}
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

}
