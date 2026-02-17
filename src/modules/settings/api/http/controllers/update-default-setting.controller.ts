import { Body, Controller, Patch } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Auth } from '@toeichust/common';
import { UpdateDefaultSettingCommand } from '../../../core/application/commands/update-default-setting.command';
import { UpdateDefaultSettingRequestDto } from '../dto/request.dto/update-default-setting.request.dto';
import { UpdateDefaultSettingResponseDto } from '../dto/response.dto/update-default-setting.response.dto';

@Controller('settings/default')
export class UpdateDefaultSettingController {
  constructor(private readonly commandBus: CommandBus) {}

  @Patch()
  @Auth.Admin()
  async updateDefaultSetting(
    @Body() payload: UpdateDefaultSettingRequestDto,
  ): Promise<UpdateDefaultSettingResponseDto> {
    const result = await this.commandBus.execute(
      new UpdateDefaultSettingCommand(
        payload.key,
        payload.value,
        payload.type,
        payload.description,
      ),
    );

    return new UpdateDefaultSettingResponseDto({
      message: 'Default setting updated successfully',
      data: {
        id: result.data.id,
        key: result.data.key,
        value: result.data.value,
        type: result.data.type,
        description: result.data.description,
        createdAt: result.data.createdAt,
        updatedAt: result.data.updatedAt,
      },
    });
  }
}
