import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichContentModule } from '../../rich-content/rich-content.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    RichContentModule,
  ],
  declarations: [CommentFormComponent],
  exports: [CommentFormComponent],
})
export class CommentFormModule { }
