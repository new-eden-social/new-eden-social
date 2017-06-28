import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { SSOModule } from '../external/sso/sso.module';
import { CharactersModule } from '../character/character.module';

@Module({
  modules: [
    SSOModule,
    CharactersModule,
  ],
  controllers: [
    AuthenticationController,
  ],
  components: [
    AuthenticationService,
  ],
})
export class AuthenticationModule {
}
