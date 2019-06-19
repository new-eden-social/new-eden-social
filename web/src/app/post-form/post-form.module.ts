import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostFormComponent } from './post-form.component';
import {
  MatButtonModule, MatExpansionModule, MatIconModule,
  MatMenuModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RichContentModule } from '../rich-content/rich-content.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    RichContentModule,
    PickerModule,
    EmojiModule,
    MatIconModule,
  ],
  exports: [PostFormComponent],
  declarations: [PostFormComponent],
})
export class PostFormModule {
}
