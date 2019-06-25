import { Injectable } from '@angular/core';
import { DPost } from './post.dto';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  getPostLink(post: DPost) {
    const wallOrAuthor = this.getWall(post) || this.getAuthor(post);
    return [...wallOrAuthor.link, 'post', post.id];
  }

  getAuthor(post: DPost): {
    name: string,
    handle: string,
    link: string[],
    image: string,
  } {
    if (post.character) {
      return this.getInfoDependingOnType(post.character, 'character');
    }
    if (post.corporation) {
      return this.getInfoDependingOnType(post.corporation, 'corporation');
    }
    if (post.alliance) {
      return this.getInfoDependingOnType(post.alliance, 'alliance');
    }
  }

  getWall(post: DPost): {
    name: string,
    handle: string,
    link: string[],
    image: string,
  } {
    if (post.characterWall) {
      return this.getInfoDependingOnType(post.characterWall, 'character');
    }
    if (post.corporationWall) {
      return this.getInfoDependingOnType(post.corporationWall, 'corporation');
    }
    if (post.allianceWall) {
      return this.getInfoDependingOnType(post.allianceWall, 'alliance');
    }
  }

  private getInfoDependingOnType(
    item: any,
    type: 'character' | 'corporation' | 'alliance',
  ) {
    switch (type) {
      case 'character':
        return {
          name: item.name,
          handle: item.handle,
          link: ['/character', item.id],
          image: item.portrait.px64x64,
        };
      case 'corporation':
        return {
          name: item.name,
          handle: item.handle,
          link: ['/corporation', item.id],
          image: item.icon.px64x64,
        };
      case 'alliance':
        return {
          name: item.name,
          handle: item.handle,
          link: ['/alliance', item.id],
          image: item.icon.px64x64,
        };
    }
  }
}
