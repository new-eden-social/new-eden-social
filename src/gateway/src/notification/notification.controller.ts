import { ApiBearerAuth, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { Pagination, VPagination } from '@new-eden-social/pagination';
import { DNotificationList } from './notification.dto';
import { AuthenticatedCharacter } from '../authentication/authentication.decorators';
import { AuthenticationGuard } from '../authentication/authentication.guard';
import { NotificationGrpcClient } from '@new-eden-social/api-notification';
import { ICharacterResponse } from '@new-eden-social/api-character';

@ApiUseTags('notifications')
@Controller('notifications')
export class NotificationController {

  constructor(
    private readonly notificationClient: NotificationGrpcClient,
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
    @AuthenticatedCharacter() character: ICharacterResponse,
  ): Promise<DNotificationList> {
    const { notifications, count } = await this.notificationClient.service.getLatest({
      characterId: character.id,
      pagination: {
        limit: pagination.limit,
        page: pagination.page,
      }
    }).toPromise();

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
    @AuthenticatedCharacter() character: ICharacterResponse,
  ): Promise<void> {
    await this.notificationClient.service.markAsSeen({
      notificationId,
      characterId: character.id,
    }).toPromise();
  }
}
