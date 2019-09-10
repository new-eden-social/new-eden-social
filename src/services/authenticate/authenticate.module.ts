import { Module } from '@nestjs/common';
import { LoggerModule } from '@new-eden-social/logger';
import { UtilsModule } from '@new-eden-social/utils';
import { AuthenticateGrpcController } from '@new-eden-social/services-authenticate/grpc/authenticate.grpc.controller';

@Module({
  imports: [
    LoggerModule,
    UtilsModule,
  ],
  controllers: [
    AuthenticateGrpcController,
  ],
  providers: [
  ],
})
export class AuthenticateModule {
}
