import { Controller } from '@nestjs/common';
import { IFollowGrpcService } from './follow.grpc.interface';

@Controller()
export class FollowGrpcController implements IFollowGrpcService {
}
