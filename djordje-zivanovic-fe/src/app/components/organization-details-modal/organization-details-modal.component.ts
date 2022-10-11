import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';

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

  constructor(private organizationService: OrganizationService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.organization = {} as Organization;
  }

  ngOnInit(): void {
    this.organizationService.fetchOrganizationById(this.data.id).subscribe(organization => {
      this.organization = organization;
    })
  }

}
