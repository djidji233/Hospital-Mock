import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Examination } from 'src/app/models/examination.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { ExaminationDetailsModalComponent } from '../examination-details-modal/examination-details-modal.component';
import { PatientDetailsModalComponent } from '../patient-details-modal/patient-details-modal.component';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {

  examinations: Examination[]

  constructor(private examinationService: ExaminationService, public dialog: MatDialog) {
    this.examinations = []
  }

  ngOnInit(): void {
    this.fetchExaminations()
  }

  fetchExaminations() {
    this.examinationService.fetchExaminations().subscribe(examinations => this.examinations = examinations)
  }

  detailsModal(examinationId: number) {
    this.dialog
      .open(ExaminationDetailsModalComponent, { data: { id: examinationId } })
  }

  editModal(examinationId: number) {
    //TODO
  }

  deleteModal(examinationId: number, examinationIdentifier: string) {
    //TODO
  }

  createModal() {
    //TODO
  }
}
