import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHashtagGrpcService } from './hashtag.grpc.interface';
import { HashtagService } from '../hashtag.service';
import { Hashtag } from '../hashtag.entity';

@Controller()
export class HashtagGrpcController implements IHashtagGrpcService {

  constructor(
    private readonly hashtagService: HashtagService,
    ) {
  }

  @GrpcMethod('HashtagService')
  parse(text: string): Observable<string[]> {
    return from(this.hashtagService.parse(text)).pipe<string[]>(
      map<Hashtag[], string[]>(hashtags => hashtags.map(hashtag => hashtag.name))
    );
  }

}
