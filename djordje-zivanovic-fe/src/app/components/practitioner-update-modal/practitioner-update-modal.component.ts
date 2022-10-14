import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenderEnum } from 'src/app/models/gender.enum';
import { Organization } from 'src/app/models/organization.model';
import { Practitioner, PractitionerCreationModificationRequest, PractitionerQualificationEnum } from 'src/app/models/practitioner.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { PractitionerService } from 'src/app/services/practitioner.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-practitioner-update-modal',
  templateUrl: './practitioner-update-modal.component.html',
  styleUrls: ['./practitioner-update-modal.component.css']
})
export class PractitionerUpdateModalComponent implements OnInit {

  request: PractitionerCreationModificationRequest;
  organizations: Organization[];
  qualificationEnum = PractitionerQualificationEnum;
  @Input() qualificationEnums: string[];
  genderEnum = GenderEnum;
  @Input() genderEnums: string[]
  practitioner: Practitioner;

  constructor(
    private practitionerService: PractitionerService,
    private organizationService: OrganizationService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<PractitionerUpdateModalComponent>
  ) {
    this.request = new PractitionerCreationModificationRequest()
    this.organizations = []
    this.qualificationEnums = []
    this.genderEnums = []
    this.practitioner = {} as Practitioner;
  }

  ngOnInit(): void {
    this.organizationService.fetchOrganizations().subscribe(organizations => this.organizations = organizations)
    this.practitionerService.fetchPractitionerById(this.data.id).subscribe(practitioner => this.practitioner = practitioner)
    this.qualificationEnums = Object.keys(this.qualificationEnum)
    this.genderEnums = Object.keys(this.genderEnum)
  }

  cancel() {
    this.request = new PractitionerCreationModificationRequest()
  }

  setBirthDate(event: any) {
    this.request.birthDate = event.target.value
  }

  updatePractitioner() {
    this.practitionerService.updatePractitioner(this.practitioner.practitionerId, this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('Updated practitioner!')
          this.practitioner = res
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
