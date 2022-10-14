import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Examination, ExaminationCreationModificationRequest, ExaminationPriorityEnum, ExaminationStatusEnum, ServiceTypeEnum } from 'src/app/models/examination.model';
import { Organization } from 'src/app/models/organization.model';
import { Patient } from 'src/app/models/patient.model';
import { Practitioner } from 'src/app/models/practitioner.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { PatientService } from 'src/app/services/patient.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-examination-create-modal',
  templateUrl: './examination-create-modal.component.html',
  styleUrls: ['./examination-create-modal.component.css']
})
export class ExaminationCreateModalComponent implements OnInit {

  request: ExaminationCreationModificationRequest;
  statusEnum = ExaminationStatusEnum;
  @Input() statusEnums: string[]
  serviceTypeEnum = ServiceTypeEnum;
  @Input() serviceTypeEnums: string[]
  priorityEnum = ExaminationPriorityEnum;
  @Input() priorityEnums: string[]
  organizations: Organization[];
  practitioners: Practitioner[];
  patients: Patient[];

  newExamination: Examination;
  maxChars = 255

  constructor(
    private examinationService: ExaminationService,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private patientService: PatientService,
    private dialogRef: MatDialogRef<ExaminationCreateModalComponent>
  ) {
    this.request = new ExaminationCreationModificationRequest();
    this.statusEnums = []
    this.serviceTypeEnums = []
    this.priorityEnums = []
    this.organizations = []
    this.practitioners = []
    this.patients = []
    this.newExamination = {} as Examination
  }

  ngOnInit(): void {
    this.statusEnums = Object.keys(this.statusEnum)
    this.serviceTypeEnums = Object.keys(this.serviceTypeEnum)
    this.priorityEnums = Object.keys(this.priorityEnum)
    this.organizationService.fetchOrganizations().subscribe(organizations => this.organizations = organizations)
    this.practitionerService.fetchPractitioners().subscribe(practitioners => this.practitioners = practitioners)
    this.patientService.fetchPatients().subscribe(patients => this.patients = patients)
  }

  cancel() {
    this.request = new ExaminationCreationModificationRequest()
  }

  setStartDate(event: any) {
    this.request.startDate = event.target.value
  }

  setEndDate(event: any) {
    this.request.endDate = event.target.value
  }

  createExamination() {
    this.examinationService.createExamination(this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('New examination created!')
          this.newExamination = res
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
