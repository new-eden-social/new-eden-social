import { Injectable } from '@nestjs/common';
import { EventObservable } from '@nestjs/cqrs';
import { Observable } from 'rxjs/Observable';
import { CharacterCreatedPostEvent } from '../events/create.event';
import { map } from 'rxjs/operators';
import { Post } from '../post.entity';

@Injectable()
export class PostNotificationSagas {
  characterCreatedPost = (events$: EventObservable<any>): Observable<void> => {
    return events$
    .ofType(CharacterCreatedPostEvent)
    .pipe(
      map((event: Post) => console.log('Character CREATE POST EVENT!! ')),
    );
  }
}
