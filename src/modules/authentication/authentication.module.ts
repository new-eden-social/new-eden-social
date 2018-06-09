import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SSOModule } from '../core/external/sso/sso.module';
import { CharacterModule } from '../character/character.module';
import { AuthenticationGuard } from './authentication.guard';

@Module({
  imports: [
    SSOModule,
    CharacterModule,
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
