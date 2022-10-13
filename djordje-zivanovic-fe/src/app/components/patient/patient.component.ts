import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/models/patient.model';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  patients: Patient[]

  constructor(private patientService: PatientService) {
    this.patients = []
  }

  ngOnInit(): void {
    this.fetchPatients()
  }

  fetchPatients() {
    this.patientService.fetchPatients().subscribe(patients => this.patients = patients);
  }

  detailsModal(patientId: number) {
    //TODO
  }

  editModal(patientId: number) {
    //TODO
  }

  deleteModal(patientId: number, patientrName: string, patientSurname: string) {
    //TODO
  }

  createModal() {
    //TODO
  }



}
