import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GenderEnum } from 'src/app/models/gender.enum';
import { MaritalStatusEnum } from 'src/app/models/marital.status.enum';
import { Organization } from 'src/app/models/organization.model';
import { Patient, PatientCreationModificationRequest } from 'src/app/models/patient.model';
import { Practitioner } from 'src/app/models/practitioner.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { PatientService } from 'src/app/services/patient.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-patient-create-modal',
  templateUrl: './patient-create-modal.component.html',
  styleUrls: ['./patient-create-modal.component.css']
})
export class PatientCreateModalComponent implements OnInit {

  request: PatientCreationModificationRequest;
  organizations: Organization[]
  practitioners: Practitioner[]
  genderEnum = GenderEnum
  @Input() genderEnums: string[]
  maritalStatusEnum = MaritalStatusEnum
  @Input() maritalStatusEnums: string[]
  newPatient: Patient

  constructor(private patientService: PatientService,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private dialogRef: MatDialogRef<PatientCreateModalComponent>) {
    this.request = new PatientCreationModificationRequest()
    this.organizations = []
    this.practitioners = []
    this.genderEnums = []
    this.maritalStatusEnums = []
    this.newPatient = {} as Patient
  }

  ngOnInit(): void {
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

  createPatient() {
    this.patientService.createPatient(this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('New patient created!')
          this.newPatient = res
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
