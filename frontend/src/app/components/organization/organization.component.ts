import { Component, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationDetailsModalComponent } from '../organization-details-modal/organization-details-modal.component';
import { OrganizationCreateModalComponent } from '../organization-create-modal/organization-create-modal.component';
import { OrganizationUpdateModalComponent } from '../organization-update-modal/organization-update-modal.component';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[]

  constructor(private organizationService: OrganizationService, public dialog: MatDialog) {
    this.organizations = []
  }

  ngOnInit(): void {
    this.fetchOrganizations()
  }

  fetchOrganizations() {
    this.organizationService.fetchOrganizations().subscribe(
      organizations => {
        this.organizations = organizations
      }
    )
  }

  detailsModal(organizationId: number) {
    this.dialog
      .open(OrganizationDetailsModalComponent, { data: { id: organizationId } })
  }

  editModal(organizationId: number) {
    this.dialog
      .open(OrganizationUpdateModalComponent, { data: { id: organizationId } })
      .afterClosed()
      .subscribe(() => this.fetchOrganizations())
  }

  deleteModal(organizationId: number, organizationName: string) {
    if (confirm('Are you sure you want to delete organization: ' + organizationName)) {
      this.organizationService.deleteOrganization(organizationId)
        .subscribe(
          (res) => this.fetchOrganizations(),
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
      .open(OrganizationCreateModalComponent)
      .afterClosed()
      .subscribe(() => this.fetchOrganizations())
  }

}
