import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ɵInjectableAnimationEngine } from '@angular/platform-browser/animations';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { DialogData } from '../organization-details-modal/organization-details-modal.component';

@Component({
  selector: 'app-patient-details-modal',
  templateUrl: './patient-details-modal.component.html',
  styleUrls: ['./patient-details-modal.component.css']
})
export class PatientDetailsModalComponent implements OnInit {

  patient: Patient;

  constructor(private patientService: PatientService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.patient = {} as Patient;
  }

  ngOnInit(): void {
    this.patientService.fetchPatientById(this.data.id).subscribe(patient => this.patient = patient)
  }

}
