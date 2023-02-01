import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenderEnum } from 'src/app/models/gender.enum';
import { MaritalStatusEnum } from 'src/app/models/marital.status.enum';
import { Organization } from 'src/app/models/organization.model';
import { Patient, PatientCreationModificationRequest } from 'src/app/models/patient.model';
import { Practitioner } from 'src/app/models/practitioner.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { PatientService } from 'src/app/services/patient.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-patient-update-modal',
  templateUrl: './patient-update-modal.component.html',
  styleUrls: ['./patient-update-modal.component.css']
})
export class PatientUpdateModalComponent implements OnInit {

  request: PatientCreationModificationRequest;
  organizations: Organization[]
  practitioners: Practitioner[]
  genderEnum = GenderEnum
  @Input() genderEnums: string[]
  maritalStatusEnum = MaritalStatusEnum
  @Input() maritalStatusEnums: string[]
  patient: Patient

  constructor(private patientService: PatientService,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<PatientUpdateModalComponent>) {
    this.request = new PatientCreationModificationRequest()
    this.organizations = []
    this.practitioners = []
    this.genderEnums = []
    this.maritalStatusEnums = []
    this.patient = {} as Patient
  }

  ngOnInit(): void {
    this.patientService.fetchPatientById(this.data.id).subscribe(patient => this.patient = patient)
    this.organizationService.fetchOrganizations().subscribe(organizations => this.organizations = organizations)
    this.practitionerService.fetchPractitioners().subscribe(practitioners => this.practitioners = practitioners)
    this.genderEnums = Object.keys(this.genderEnum)
    this.maritalStatusEnums = Object.keys(this.maritalStatusEnum)
  }

  cancel() {
    this.request = new PatientCreationModificationRequest()
  }

  setBirthDate(event: any) {
    this.request.birthDate = event.target.value
  }

  updatePatient() {
    this.patientService.updatePatient(this.patient.patientId, this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('Updated patient!')
          this.patient = res
        },
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
