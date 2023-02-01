import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization.model';
import { ExaminationService } from 'src/app/services/examination.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-organization-details-modal',
  templateUrl: './organization-details-modal.component.html',
  styleUrls: ['./organization-details-modal.component.css']
})
export class OrganizationDetailsModalComponent implements OnInit {

  organization: Organization;
  practitionersNumber: number;
  runningExaminationsNumber: number;
  performedExaminationsNumber: number;

  constructor(
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService,
    private examinationService: ExaminationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
    this.practitionersNumber = 0;
    this.runningExaminationsNumber = 0;
    this.performedExaminationsNumber = 0;
    this.organization = {} as Organization;
  }

  ngOnInit(): void {
    this.practitionerService.fetchPractitioners(this.data.id).subscribe(practitioners => this.practitionersNumber = practitioners.length)
    this.examinationService.fetchExaminations(this.data.id, "IN_PROGRESS").subscribe(examinations => this.runningExaminationsNumber = examinations.length)
    this.examinationService.fetchExaminations(this.data.id, "FINISHED").subscribe(examinations => this.performedExaminationsNumber = examinations.length)
    this.organizationService.fetchOrganizationById(this.data.id).subscribe(organization => {
      this.organization = organization;
    })
  }

}
