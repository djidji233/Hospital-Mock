import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Examination } from 'src/app/models/examination.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { DialogData } from '../organization-details-modal/organization-details-modal.component';

@Component({
  selector: 'app-examination-details-modal',
  templateUrl: './examination-details-modal.component.html',
  styleUrls: ['./examination-details-modal.component.css']
})
export class ExaminationDetailsModalComponent implements OnInit {

  examination: Examination;

  constructor(private examinationService: ExaminationService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.examination = {} as Examination;
  }

  ngOnInit(): void {
    this.examinationService.fetchExaminationById(this.data.id).subscribe(examination => this.examination = examination)
  }

}
