import { Module, forwardRef } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { EVESSOModule } from '@new-eden-social/eve-sso';
import { CharacterModule } from '../../../src/modules/character/character.module';
import { AuthenticationGuard } from './authentication.guard';

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
