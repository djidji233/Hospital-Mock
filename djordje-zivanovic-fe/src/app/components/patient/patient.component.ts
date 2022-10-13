import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { PatientCreateModalComponent } from '../patient-create-modal/patient-create-modal.component';
import { PatientDetailsModalComponent } from '../patient-details-modal/patient-details-modal.component';
import { PatientUpdateModalComponent } from '../patient-update-modal/patient-update-modal.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Patient[]

  constructor(private patientService: PatientService, public dialog: MatDialog) {
    this.patients = []
  }

  ngOnInit(): void {
    this.fetchPatients()
  }

  fetchPatients() {
    this.patientService.fetchPatients().subscribe(patients => this.patients = patients);
  }

  detailsModal(patientId: number) {
    this.dialog
      .open(PatientDetailsModalComponent, { data: { id: patientId } })
  }

  editModal(patientId: number) {
    this.dialog
      .open(PatientUpdateModalComponent, { data: { id: patientId } })
      .afterClosed()
      .subscribe(() => this.fetchPatients())
  }

  deleteModal(patientId: number, patientName: string, patientSurname: string) {
    if (confirm('Are you sure you want to delete patient: ' + patientName + ' ' + patientSurname)) {
      this.patientService.deletePatient(patientId)
        .subscribe(
          (res) => this.fetchPatients(),
          (error) => {
            let errorStr = JSON.stringify(error.error)
            errorStr = errorStr.substring(1, errorStr.length - 1)
            let errors = errorStr.split(',').join('\n')
            console.log(errors)
            alert(errors)
          }
        )
    }
  }

  createModal() {
    this.dialog
      .open(PatientCreateModalComponent)
      .afterClosed()
      .subscribe(() => this.fetchPatients())
  }



}
