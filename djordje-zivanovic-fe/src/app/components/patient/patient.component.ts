import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';
import { PatientCreateModalComponent } from '../patient-create-modal/patient-create-modal.component';
import { PatientDetailsModalComponent } from '../patient-details-modal/patient-details-modal.component';

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
    //TODO
  }

  deleteModal(patientId: number, patientrName: string, patientSurname: string) {
    //TODO
  }

  createModal() {
    this.dialog
      .open(PatientCreateModalComponent)
      .afterClosed()
      .subscribe(() => this.fetchPatients())
  }



}
