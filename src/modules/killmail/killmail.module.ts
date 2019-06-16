import { Module, forwardRef } from '@nestjs/common';
import { KillmailService } from './killmail.service';
import { KillmailParticipantModule } from './participant/participant.module';
import { PostModule } from '../post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KillmailRepository } from './killmail.repository';
import { ZKillboardModule } from '../core/external/zkillboard/zkillboard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([KillmailRepository]),

    forwardRef(() => PostModule),
    KillmailParticipantModule,
    ZKillboardModule,
  ],
  providers: [
    KillmailService,
  ],
  exports: [
    KillmailService,
  ],
})
export class KillmailModule {
}
