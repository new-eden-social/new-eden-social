import { ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { Pagination } from '../core/pagination/pagination.decorator';
import { VPagination } from '../core/pagination/pagination.validation';
import { DNotification, DNotificationList } from './notification.dto';
import { NotificationService } from './notification.service';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { Character } from '../character/character.entity';

@ApiUseTags('notifications')
@Controller('notifications')
export class NotificationController {

  constructor(
    private notificationService: NotificationService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DNotificationList,
    description: 'Get latest notifications',
  })
  @Get('/latest')
  public async latest(
    @Pagination() pagination: VPagination,
    @AuthenticatedCharacter() character: Character,
  ): Promise<DNotificationList> {
    const { notifications, count } = await this.notificationService.getLatest(
      character,
      pagination.limit,
      pagination.page);

    return new DNotificationList(notifications, pagination.page, pagination.limit, count);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Mark notification seen',
  })
  @Post('/:notificationId/seen')
  public async markSeen(
    @Param('notificationId') notificationId: string,
    @AuthenticatedCharacter() character: Character,
  ): Promise<void> {
    const notification = await this.notificationService.get(notificationId, character);
    await this.notificationService.markAsSeen(notification);
  }
}
