import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { GenderEnum } from 'src/app/models/gender.enum';
import { Organization } from 'src/app/models/organization.model';
import { Practitioner, PractitionerCreationModificationRequest, PractitionerQualificationEnum } from 'src/app/models/practitioner.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

@Component({
  selector: 'app-practitioner-create-modal',
  templateUrl: './practitioner-create-modal.component.html',
  styleUrls: ['./practitioner-create-modal.component.css']
})
export class PractitionerCreateModalComponent implements OnInit {

  request: PractitionerCreationModificationRequest;
  organizations: Organization[];
  qualificationEnum = PractitionerQualificationEnum;
  @Input() qualificationEnums: string[];
  genderEnum = GenderEnum;
  @Input() genderEnums: string[]
  newPractitioner: Practitioner;

  constructor(private practitionerService: PractitionerService, private organizationService: OrganizationService, private dialogRef: MatDialogRef<PractitionerCreateModalComponent>) {
    this.request = new PractitionerCreationModificationRequest()
    this.organizations = []
    this.qualificationEnums = []
    this.genderEnums = []
    this.newPractitioner = {} as Practitioner
  }

  ngOnInit(): void {
    this.organizationService.fetchOrganizations().subscribe(organizations => this.organizations = organizations)
    this.qualificationEnums = Object.keys(this.qualificationEnum)
    this.genderEnums = Object.keys(this.genderEnum)
  }

  cancel() {
    this.request = new PractitionerCreationModificationRequest()
  }

  setBirthDate(event: any) {
    this.request.birthDate = event.target.value
  }

  createPractitioner() {
    this.practitionerService.createPractitioner(this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('New practitioner created!')
          this.newPractitioner = res
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
