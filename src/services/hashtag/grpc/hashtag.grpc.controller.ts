import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { IHashtagGrpcService } from '@new-eden-social/services-hashtag/grpc/hashtag.grpc.interface';
import { HashtagService } from '@new-eden-social/services-hashtag/hashtag.service';
import { Hashtag } from '@new-eden-social/services-hashtag/hashtag.entity';

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
