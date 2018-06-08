import { ApiUseTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiUseTags('notifications')
@Controller('notifications')
export class NotificationController {
}
