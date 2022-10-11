import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
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

  constructor(private organizationService: OrganizationService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
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

  deleteModal(organizationId: number) {
    //TODO
    console.log('delete organization')
  }

  createModal() {
    this.dialog
      .open(OrganizationCreateModalComponent)
      .afterClosed()
      .subscribe(() => this.fetchOrganizations())
  }

}
