import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Pagination, VPagination } from '@new-eden-social/pagination';
import { DNotificationList } from './notification.dto';
import { NotificationService } from './notification.service';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { Character } from '@new-eden-soci@new-eden-social/api-character';
import { AuthenticationGuard } from '../authentication/authentication.guard';

@ApiUseTags('notifications')
@Controller('notifications')
export class NotificationController {

  constructor(
    private readonly notificationService: NotificationService,
  ) {
  }

  @ApiResponse({
    status: HttpStatus.OK,
    type: DNotificationList,
    description: 'Get latest notifications',
  })
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
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
  @ApiBearerAuth()
  @UseGuards(AuthenticationGuard)
  @Post('/:notificationId/seen')
  public async markSeen(
    @Param('notificationId') notificationId: string,
    @AuthenticatedCharacter() character: Character,
  ): Promise<void> {
    const notification = await this.notificationService.get(notificationId, character);
    await this.notificationService.markAsSeen(notification);
  }
}
