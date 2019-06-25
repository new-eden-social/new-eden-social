import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { EVESSOModule } from '@new-eden-social/eve-sso';
import { CharacterModule } from '../character/character.module';
import { AuthenticationGuard } from './authentication.guard';
import { FollowModule } from '../follow/follow.module';

@Module({
  imports: [
    EVESSOModule,
    forwardRef(() => CharacterModule),
  ],
  controllers: [
    AuthenticationController,
  ],
  providers: [
    AuthenticationService,
    AuthenticationGuard,
  ],
  exports: [
    AuthenticationService,
    AuthenticationGuard,
  ],
})
export class AuthenticationModule {
}
