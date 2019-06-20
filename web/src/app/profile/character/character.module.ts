import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character.component';
import { FooterModule } from '../../footer/footer.module';
import { RouterModule } from '@angular/router';
import { ProfileHeaderModule } from '../header/header.module';
import { LoadingModule } from '../../loading/loading.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    ProfileHeaderModule,
    RouterModule,
    LoadingModule,
    MatButtonModule,
  ],
  declarations: [CharacterComponent],
  exports: [CharacterComponent],
})
export class CharacterModule {
}
