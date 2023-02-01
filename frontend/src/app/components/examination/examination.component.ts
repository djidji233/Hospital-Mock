import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Examination, ExaminationPriorityEnum, ExaminationStatusEnum } from 'src/app/models/examination.model';
import { Organization } from 'src/app/models/organization.model';
import { Patient } from 'src/app/models/patient.model';
import { Practitioner } from 'src/app/models/practitioner.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { PatientService } from 'src/app/services/patient.service';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { ExaminationCreateModalComponent } from '../examination-create-modal/examination-create-modal.component';
import { ExaminationDetailsModalComponent } from '../examination-details-modal/examination-details-modal.component';
import { ExaminationUpdateModalComponent } from '../examination-update-modal/examination-update-modal.component';

@Component({
  selector: 'app-examination',
  templateUrl: './examination.component.html',
  styleUrls: ['./examination.component.css']
})
export class ExaminationComponent implements OnInit {

  // table data
  examinations: Examination[]

  // filter form data
  statusEnum = ExaminationStatusEnum;
  @Input() statusEnums: string[];
  priorityEnum = ExaminationPriorityEnum;
  @Input() priorityEnums: string[]
  organizations: Organization[]
  practitioners: Practitioner[]
  patients: Patient[]

  // filter request data
  examinationStatus: any;
  examinationPriority: any;
  organizationId: any;
  practitionerId: any;
  patientId: any;

  constructor(
    private examinationService: ExaminationService,
    public dialog: MatDialog,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private patientService: PatientService
  ) {
    this.examinations = []
    this.statusEnums = []
    this.priorityEnums = []
    this.organizations = []
    this.practitioners = []
    this.patients = []
  }

  ngOnInit(): void {
    this.statusEnums = Object.keys(this.statusEnum)
    this.priorityEnums = Object.keys(this.priorityEnum)
    this.organizationService.fetchOrganizations().subscribe(organizations => this.organizations = organizations)
    this.practitionerService.fetchPractitioners().subscribe(practitioners => this.practitioners = practitioners)
    this.patientService.fetchPatients().subscribe(patients => this.patients = patients)
    this.fetchExaminations()
  }

  fetchExaminations(
    organizationId?: any,
    examinationStatus?: any,
    examinationPriority?: any,
    practitionerId?: any,
    patientId?: any
  ) {
    this.examinationService.fetchExaminations(organizationId, examinationStatus, examinationPriority, practitionerId, patientId).subscribe(examinations => this.examinations = examinations)
  }

  detailsModal(examinationId: number) {
    this.dialog
      .open(ExaminationDetailsModalComponent, { data: { id: examinationId } })
  }

  editModal(examinationId: number) {
    this.dialog
      .open(ExaminationUpdateModalComponent, { data: { id: examinationId } })
      .afterClosed()
      .subscribe(() => this.fetchExaminations())
  }

  deleteModal(examinationId: number, examinationIdentifier: string) {
    if (confirm('Are you sure you want to delete examination: ' + examinationIdentifier)) {
      this.examinationService.deleteExamination(examinationId)
        .subscribe(
          (res) => this.fetchExaminations(),
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
      .open(ExaminationCreateModalComponent)
      .afterClosed()
      .subscribe(() => this.fetchExaminations())
  }
  
}
