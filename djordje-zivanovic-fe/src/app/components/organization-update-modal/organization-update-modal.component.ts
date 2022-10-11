import { Component, Input, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization, OrganizationCreationModificationRequest, OrganizationTypeEnum } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-organization-update-modal',
  templateUrl: './organization-update-modal.component.html',
  styleUrls: ['./organization-update-modal.component.css']
})
export class OrganizationUpdateModalComponent implements OnInit {

  organizationTypeEnum = OrganizationTypeEnum;
  @Input() organizationTypes: string[] = []
  request: OrganizationCreationModificationRequest;
  organization: Organization;

  constructor(private organizationService: OrganizationService, @Inject(MAT_DIALOG_DATA) public data: DialogData, private dialogRef: MatDialogRef<OrganizationUpdateModalComponent>) {
    this.request = new OrganizationCreationModificationRequest();
    this.organization = {} as Organization;
    this.organizationTypes = Object.keys(this.organizationTypeEnum)
  }

  ngOnInit(): void {
    this.organizationService.fetchOrganizationById(this.data.id).subscribe(organization => {
      this.organization = organization;
      // this.request.identifier = organization.identifier;
      // this.request.type = organization.type.organizationType;
      // this.request.name = organization.name;
      // this.request.address = organization.address;
      // this.request.phone = organization.phone;
      // this.request.email = organization.email;
    })
  }

  cancel() {
    this.request = new OrganizationCreationModificationRequest();
  }

  updateOrganization() {
    this.request.identifier === "" ? this.request.identifier = undefined : this.request.identifier;
    this.request.type === "" ? this.request.type = undefined : this.request.type;
    this.request.name === "" ? this.request.name = undefined : this.request.name;
    this.request.address === "" ? this.request.address = undefined : this.request.address;
    this.request.phone === "" ? this.request.phone = undefined : this.request.phone;
    this.request.email === "" ? this.request.email = undefined : this.request.email;

    this.organizationService.updateOrganization(this.organization.organizationId, this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('Updated organization!')
          this.organization = res;
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
