import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { MatButtonModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { EvebookComponent } from './evebook/evebook.component';
import { LegalComponent } from './legal/legal.component';
import { ApiComponent } from './api/api.component';
import { OtherPartiesComponent } from './other-parties/other-parties.component';
import { DonationsComponent } from './donations/donations.component';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RouterModule,
  ],
  declarations: [AboutComponent, EvebookComponent, LegalComponent, ApiComponent, OtherPartiesComponent, DonationsComponent],
})
export class AboutModule {
}
