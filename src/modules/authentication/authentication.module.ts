import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SSOModule } from '../core/external/sso/sso.module';
import { CharacterModule } from '../character/character.module';
import { AuthenticationInterceptor } from './authentication.interceptor';
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
    AuthenticationInterceptor,
    AuthenticationGuard,
  ],
  exports: [
    AuthenticationService,
    AuthenticationInterceptor,
    AuthenticationGuard,
  ],
})
export class AuthenticationModule {
}
