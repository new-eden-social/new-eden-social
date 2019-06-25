import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RichContentComponent } from './rich-content.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { HtmlOutletDirective } from './html-outlet.directive';
import { RichContentService } from './rich-content.service';
import { RichContentEditableComponent } from './rich-content-editable.component';

@NgModule({
  imports: [
    CommonModule,
    PickerModule,
  ],
  declarations: [
    RichContentComponent,
    RichContentEditableComponent,
    HtmlOutletDirective,
  ],
  providers: [
    RichContentService,
  ],
  exports: [
    RichContentComponent,
    RichContentEditableComponent,
  ],
})
export class RichContentModule { }
