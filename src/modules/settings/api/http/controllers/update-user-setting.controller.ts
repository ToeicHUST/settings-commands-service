import { Body, Controller, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Auth, CurrentUserId } from '@toeichust/common';
import { UpdateUserSettingCommand } from '../../../core/application/commands/update-user-setting.command';
import { UpdateUserSettingRequestDto } from '../dto/request.dto/update-user-setting.request.dto';
import { UpdateUserSettingResponseDto } from '../dto/response.dto/update-user-setting.response.dto';

@Controller('settings/user')
export class UpdateUserSettingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  @Auth.User()
  async updateUserSetting(
    @CurrentUserId() userId: string,
    @Body() payload: UpdateUserSettingRequestDto,
  ): Promise<UpdateUserSettingResponseDto> {
    const result = await this.commandBus.execute(
      new UpdateUserSettingCommand(userId, payload.key, payload.value),
    );

    return new UpdateUserSettingResponseDto({
      message: 'User setting updated successfully',
      data: {
        id: result.data.id,
        userId: result.data.userId,
        key: result.data.key,
        value: result.data.value,
        createdAt: result.data.createdAt,
        updatedAt: result.data.updatedAt,
      },
    });
  }
}
