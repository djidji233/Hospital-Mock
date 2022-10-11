import { Component, Input, OnInit } from '@angular/core';
import { Organization, OrganizationCreationModificationRequest, OrganizationTypeEnum } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-organization-create-modal',
  templateUrl: './organization-create-modal.component.html',
  styleUrls: ['./organization-create-modal.component.css']
})
export class OrganizationCreateModalComponent implements OnInit {

  organizationTypeEnum = OrganizationTypeEnum;
  @Input() organizationTypes: string[] = []
  request: OrganizationCreationModificationRequest;
  newOrganization: Organization;

  constructor(private organizationService: OrganizationService, private dialogRef: MatDialogRef<OrganizationCreateModalComponent>) {
    this.request = new OrganizationCreationModificationRequest();
    this.newOrganization = {} as Organization;
    this.organizationTypes = Object.keys(this.organizationTypeEnum)
  }

  ngOnInit(): void {
  }

  cancel() {
    this.request = new OrganizationCreationModificationRequest();
  }

  createOrganization() {
    this.organizationService.createOrganization(this.request)
      .subscribe(
        (res) => {
          this.dialogRef.close()
          console.log('New organization created!')
          this.newOrganization = res;
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
