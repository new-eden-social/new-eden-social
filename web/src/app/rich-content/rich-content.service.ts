import { Injectable } from '@angular/core';

@Injectable()
export class RichContentService {

  public parseHashtags(content: string, editing = false): string {
    return content.replace(
      /#(\w*[0-9a-zA-Z]+\w*[0-9a-zA-Z])/g,
      hashtag => {
        if (editing) {
          return `<span class="hashtag">${hashtag}</span>`
        }
        return `<a
            [routerLink]="['/hashtag', '${hashtag.replace('#', '')}']"
            >${hashtag}</a>`
      });

  }

  public parseEmojies(content: string): string {
    return content.replace(
      /(:[a-zA-Z0-9-_+]+:(:skin-tone-[2-6]:)?)/g,
      emoji =>
        `<ngx-emoji contenteditable="false"
                    set="emojione"
                    emoji="${emoji}"
                    size="32">` +
        `${emoji}` +
        `</ngx-emoji>`);
  }

  public parseText(content: string): string {
    // Replacing spaces with encoded value, this fixes weird issue
    // with cursor restoration
    return content.replace(' ', '&nbsp;')
  }
}
