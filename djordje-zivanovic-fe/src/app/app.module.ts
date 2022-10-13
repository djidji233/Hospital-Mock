import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { PractitionerComponent } from './components/practitioner/practitioner.component';
import { PatientComponent } from './components/patient/patient.component';
import { ExaminationComponent } from './components/examination/examination.component';

import { HttpClientModule } from "@angular/common/http";

import { MatDatepickerModule } from "@angular/material/datepicker";
import { FormsModule } from "@angular/forms";
import { OrganizationDetailsModalComponent } from './components/organization-details-modal/organization-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationCreateModalComponent } from './components/organization-create-modal/organization-create-modal.component';
import { OrganizationUpdateModalComponent } from './components/organization-update-modal/organization-update-modal.component';
import { PractitionerDetailsModalComponent } from './components/practitioner-details-modal/practitioner-details-modal.component';
import { PractitionerCreateModalComponent } from './components/practitioner-create-modal/practitioner-create-modal.component';
import { PractitionerUpdateModalComponent } from './components/practitioner-update-modal/practitioner-update-modal.component';
import { PatientDetailsModalComponent } from './components/patient-details-modal/patient-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationComponent,
    PractitionerComponent,
    PatientComponent,
    ExaminationComponent,
    OrganizationDetailsModalComponent,
    OrganizationCreateModalComponent,
    OrganizationUpdateModalComponent,
    PractitionerDetailsModalComponent,
    PractitionerCreateModalComponent,
    PractitionerUpdateModalComponent,
    PatientDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OrganizationDetailsModalComponent]
})
export class AppModule { }
