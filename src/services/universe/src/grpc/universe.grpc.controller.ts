import { Controller } from '@nestjs/common';
import { IUniverseGrpcService } from './universe.grpc.interface';

@Controller()
export class UniverseGrpcController implements IUniverseGrpcService {
}
