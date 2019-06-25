import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    RouterModule,
  ],
  providers: [],
  declarations: [FooterComponent],
  exports: [FooterComponent],
})
export class FooterModule {
}
