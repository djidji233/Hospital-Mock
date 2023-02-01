import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationComponent } from './components/organization/organization.component';
import { PractitionerComponent } from './components/practitioner/practitioner.component';
import { PatientComponent } from './components/patient/patient.component';
import { ExaminationComponent } from './components/examination/examination.component';

const routes: Routes = [
  {
    path: "organization",
    component: OrganizationComponent
  },
  {
    path: "practitioner",
    component: PractitionerComponent
  },
  {
    path: "patient",
    component: PatientComponent
  },
  {
    path: "examination",
    component: ExaminationComponent
  }

];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
