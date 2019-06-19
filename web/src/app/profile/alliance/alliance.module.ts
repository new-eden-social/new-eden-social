import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllianceComponent } from './alliance.component';
import { FooterModule } from '../../footer/footer.module';
import { ProfileHeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
import { LoadingModule } from '../../loading/loading.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    ProfileHeaderModule,
    RouterModule,
    LoadingModule,
    MatButtonModule,
  ],
  declarations: [AllianceComponent],
  exports: [AllianceComponent],
})
export class AllianceModule {
}
