import { Component, OnInit } from '@angular/core';
import { Practitioner } from 'src/app/models/practitioner.model';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PractitionerDetailsModalComponent } from '../practitioner-details-modal/practitioner-details-modal.component';

@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.component.html',
  styleUrls: ['./practitioner.component.css']
})
export class PractitionerComponent implements OnInit {

  practitioners: Practitioner[]

  constructor(private practitonerService: PractitionerService, private router: Router, private activatedRoute: ActivatedRoute, public dialog: MatDialog) {
    this.practitioners = []
  }

  ngOnInit(): void {
    this.fetchPractitioners()
  }

  fetchPractitioners() {
    this.practitonerService.fetchPractitioners().subscribe(
      practitioners => {
        this.practitioners = practitioners;
      }
    )
  }

  detailsModal(practitionerId: number) {
    this.dialog
      .open(PractitionerDetailsModalComponent, { data: { id: practitionerId } })
  }

  editModal(practitionerId: number) {
    //TODO
  }

  deleteModal(practitionerId: number, practitionerName: string) {
    //TODO
  }

  createModal() {
    //TODO
  }

}
