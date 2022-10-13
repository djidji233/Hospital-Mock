import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Examination } from 'src/app/models/examination.model';
import { ExaminationService } from 'src/app/services/examination.service';

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
    //TODO
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
