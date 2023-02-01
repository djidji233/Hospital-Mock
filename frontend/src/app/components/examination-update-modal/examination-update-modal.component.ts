import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Examination, ExaminationCreationModificationRequest, ExaminationPriorityEnum, ExaminationStatusEnum, ServiceTypeEnum } from 'src/app/models/examination.model';
import { Organization } from 'src/app/models/organization.model';
import { Patient } from 'src/app/models/patient.model';
import { Practitioner } from 'src/app/models/practitioner.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { PatientService } from 'src/app/services/patient.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-examination-update-modal',
  templateUrl: './examination-update-modal.component.html',
  styleUrls: ['./examination-update-modal.component.css']
})
export class ExaminationUpdateModalComponent implements OnInit {


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

  examination: Examination;
  maxChars = 255
  practitionerIds: number[]

  constructor(
    private examinationService: ExaminationService,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private patientService: PatientService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ExaminationUpdateModalComponent>
  ) {
    this.request = new ExaminationCreationModificationRequest();
    this.statusEnums = []
    this.serviceTypeEnums = []
    this.priorityEnums = []
    this.organizations = []
    this.practitioners = []
    this.patients = []
    this.examination = {} as Examination
    this.practitionerIds = []
  }

  ngOnInit(): void {
    this.organizationService.fetchOrganizations().subscribe(organizations => this.organizations = organizations)
    this.practitionerService.fetchPractitioners().subscribe(practitioners => this.practitioners = practitioners)
    this.patientService.fetchPatients().subscribe(patients => this.patients = patients)
    this.examinationService.fetchExaminationById(this.data.id).subscribe(examination => {
      this.examination = examination
      this.examination.startDate = this.examination.startDate.replace(' ', 'T') //so html can understand and set calendar value
      this.examination.endDate = this.examination.endDate.replace(' ', 'T')
      this.practitionerIds = examination.practitioners.map((practitioner) => practitioner.practitionerId)
    })
    this.statusEnums = Object.keys(this.statusEnum)
    this.serviceTypeEnums = Object.keys(this.serviceTypeEnum)
    this.priorityEnums = Object.keys(this.priorityEnum)
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

  updateExamination() {
    this.examinationService.updateExamination(this.examination.examinationId, this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('Updated examination!')
          this.examination = res
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
