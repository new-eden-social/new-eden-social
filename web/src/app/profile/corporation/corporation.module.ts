import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorporationComponent } from './corporation.component';
import { FooterModule } from '../../footer/footer.module';
import { LoadingModule } from '../../loading/loading.module';
import { ProfileHeaderModule } from '../header/header.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    LoadingModule,
    ProfileHeaderModule,
    RouterModule,
    MatButtonModule,
  ],
  declarations: [CorporationComponent],
  exports: [CorporationComponent],
})
export class CorporationModule {
}
