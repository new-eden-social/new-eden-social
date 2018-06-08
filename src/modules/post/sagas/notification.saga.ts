import { Injectable } from '@nestjs/common';
import { EventObservable } from '@nestjs/cqrs';
import { Observable } from 'rxjs/Observable';
import { CreatePostEvent } from '../events/create.event';
import 'rxjs/add/operator/map';

@Injectable()
export class PostNotificationSagas {
  postCreated = (events$: EventObservable<any>): Observable<void> => {
    return events$.ofType(CreatePostEvent)
    .map(event => console.log('CREATE POST EVEN ', event));
  }
}
