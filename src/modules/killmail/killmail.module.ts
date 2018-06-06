import { Module } from '@nestjs/common';
import { KillmailsStreamModule } from '../core/external/killmailsStream/killmailsStream.module';
import { KillmailService } from './killmail.service';
import { KillmailParticipantModule } from './participant/participant.module';
import { PostModule } from '../post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillmailRepository } from './killmail.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([KillmailRepository]),

    KillmailsStreamModule,
    KillmailParticipantModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    KillmailService,
  ],
  exports: [
    KillmailService,
  ],
})
export class KillmailModule {
}
