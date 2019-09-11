import { Controller } from '@nestjs/common';
import { IUniverseGrpcService } from '@new-eden-social/services-universe/grpc/universe.grpc.interface';

@Controller()
export class UniverseGrpcController implements IUniverseGrpcService {
}
