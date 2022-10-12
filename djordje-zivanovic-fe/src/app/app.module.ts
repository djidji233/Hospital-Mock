import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { PractitionerComponent } from './components/practitioner/practitioner.component';
import { PatientComponent } from './components/patient/patient.component';
import { ExaminationComponent } from './components/examination/examination.component';

import { HttpClientModule } from "@angular/common/http";

import { FormsModule } from "@angular/forms";
import { OrganizationDetailsModalComponent } from './components/organization-details-modal/organization-details-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrganizationCreateModalComponent } from './components/organization-create-modal/organization-create-modal.component';
import { OrganizationUpdateModalComponent } from './components/organization-update-modal/organization-update-modal.component';
import { PractitionerDetailsModalComponent } from './components/practitioner-details-modal/practitioner-details-modal.component';

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
    PractitionerDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [OrganizationDetailsModalComponent]
})
export class AppModule { }
