import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SSOModule } from '../core/external/sso/sso.module';
import { CharacterModule } from '../character/character.module';
import { AuthMiddleware } from './authentication.middleware';

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
  ],
})
export class AuthenticationModule {
  configure(consumer: MiddlewaresConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'authentication/sso/verify', method: RequestMethod.GET,
    });
  }
}
