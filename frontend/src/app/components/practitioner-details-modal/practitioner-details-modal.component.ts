import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Practitioner } from 'src/app/models/practitioner.model';
import { PractitionerService } from 'src/app/services/practitioner.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-practitioner-details-modal',
  templateUrl: './practitioner-details-modal.component.html',
  styleUrls: ['./practitioner-details-modal.component.css']
})
export class PractitionerDetailsModalComponent implements OnInit {

  practitioner: Practitioner;

  constructor(private practitionerService: PractitionerService, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.practitioner = {} as Practitioner;
  }

  ngOnInit(): void {
    this.practitionerService.fetchPractitionerById(this.data.id).subscribe(practitioner => {
      this.practitioner = practitioner;
    })
  }

}
