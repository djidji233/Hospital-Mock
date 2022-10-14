import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Examination } from 'src/app/models/examination.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { ExaminationCreateModalComponent } from '../examination-create-modal/examination-create-modal.component';
import { ExaminationDetailsModalComponent } from '../examination-details-modal/examination-details-modal.component';
import { ExaminationUpdateModalComponent } from '../examination-update-modal/examination-update-modal.component';

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
    this.dialog
      .open(ExaminationUpdateModalComponent, { data: { id: examinationId } })
      .afterClosed()
      .subscribe(() => this.fetchExaminations())
  }

  deleteModal(examinationId: number, examinationIdentifier: string) {
    //TODO
  }

  createModal() {
    this.dialog
      .open(ExaminationCreateModalComponent)
      .afterClosed()
      .subscribe(() => this.fetchExaminations())
  }
}
