import {
  Component, Output, ElementRef, EventEmitter, HostListener, Input,
} from '@angular/core';
import { RichContentService } from './rich-content.service';

@Component({
  selector: 'app-rich-content-editable',
  template: '<html-outlet [editable]="true" [html]="contentHtml"></html-outlet>',
})
export class RichContentEditableComponent {

  @Output()
  update = new EventEmitter<string>();

  @Output()
  submit = new EventEmitter();

  public contentHtml = '';

  constructor(
    private richContentService: RichContentService,
    private elRef: ElementRef,
  ) {
  }

  public clear() {
    this.contentHtml = '';
    this.update.emit('');
  }

  public setValue(value: string) {
    this.update.emit(value);

    let html = value;
    // TODO: Sanitize html, as for now it should be just text
    html = this.richContentService.parseText(html);
    html = this.richContentService.parseHashtags(html, true);
    // We don't parse emojis when editing, it complicates stuff by a shit ton (cursor positioning)..
    // html = this.richContentService.parseEmojies(html);

    this.contentHtml = html;
  }

  @HostListener('keyup', ['$event'])
  writing(event: KeyboardEvent) {
    if (event.key === 'Enter') {
        this.submit.emit();
    } else {
      const value = this.elRef.nativeElement.textContent;
      this.setValue(value);
    }
  }
}
