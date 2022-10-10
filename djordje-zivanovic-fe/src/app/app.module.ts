import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { PractitionerComponent } from './components/practitioner/practitioner.component';
import { PatientComponent } from './components/patient/patient.component';
import { ExaminationComponent } from './components/examination/examination.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizationComponent,
    PractitionerComponent,
    PatientComponent,
    ExaminationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
