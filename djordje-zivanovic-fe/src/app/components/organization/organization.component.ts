import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Organization } from 'src/app/models/organization.model';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit {

  organizations: Organization[]

  constructor(private organizationService: OrganizationService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.organizations = []
  }

  ngOnInit(): void {
    this.organizationService.fetchOrganizations().subscribe(
      organizations => {
        this.organizations = organizations
      }
    )
  }

  getOrganizationDetails(organizationId: number) {
    //TODO
    console.log('organization details')
  }

  editOrganization(organizationId: number) {
    //TODO
    console.log('edit organization')
  }

  deleteOrganization(organizationId: number) {
    //TODO
    console.log('delete organization')
  }

  createOrganization() {
    //TODO
    console.log('create organization')
  }

}
