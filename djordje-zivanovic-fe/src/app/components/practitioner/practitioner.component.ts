import { Component, OnInit } from '@angular/core';
import { Practitioner } from 'src/app/models/practitioner.model';
import { PractitionerService } from 'src/app/services/practitioner.service';
import { MatDialog } from '@angular/material/dialog';
import { PractitionerDetailsModalComponent } from '../practitioner-details-modal/practitioner-details-modal.component';
import { PractitionerCreateModalComponent } from '../practitioner-create-modal/practitioner-create-modal.component';
import { PractitionerUpdateModalComponent } from '../practitioner-update-modal/practitioner-update-modal.component';

@Component({
  selector: 'app-practitioner',
  templateUrl: './practitioner.component.html',
  styleUrls: ['./practitioner.component.css']
})
export class PractitionerComponent implements OnInit {

  practitioners: Practitioner[]

  constructor(private practitonerService: PractitionerService, public dialog: MatDialog) {
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
    this.dialog
      .open(PractitionerUpdateModalComponent, { data: { id: practitionerId } })
      .afterClosed()
      .subscribe(() => this.fetchPractitioners())
  }

  deleteModal(practitionerId: number, practitionerName: string, practitionerSurname: string) {
    if (confirm('Are you sure you want to delete practitioner: ' + practitionerName + ' ' + practitionerSurname)) {
      this.practitonerService.deletePractitioner(practitionerId)
        .subscribe(
          (res) => this.fetchPractitioners(),
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
      .open(PractitionerCreateModalComponent)
      .afterClosed()
      .subscribe(() => this.fetchPractitioners())
  }

}
