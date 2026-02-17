import { Logger } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { DefaultSettingUpdatedEvent, SettingKey } from '@toeichust/common';
import { DefaultSetting } from '../../domain/entities/default-setting';
import { DefaultSettingFactory } from '../../domain/factories/default-setting.factory';
import { DefaultSettingRepositoryPort } from '../ports/data-access/default-setting.repository.port';
import { UpdateDefaultSettingCommand } from './update-default-setting.command';

@CommandHandler(UpdateDefaultSettingCommand)
export class UpdateDefaultSettingCommandHandler implements ICommandHandler<UpdateDefaultSettingCommand> {
  private readonly logger = new Logger(UpdateDefaultSettingCommandHandler.name);

  constructor(
    private readonly defaultSettingRepository: DefaultSettingRepositoryPort,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: UpdateDefaultSettingCommand,
  ): Promise<{ message: string; data: DefaultSetting }> {
    try {
      this.logger.debug(`command: ${JSON.stringify(command)}`);

      let setting = await this.defaultSettingRepository.getOneByKey(
        new SettingKey(command.key).value,
      );

      if (setting) {
        this.logger.log(`Setting found for key: ${command.key}. Updating...`);
        setting.updateSetting(command.value, command.type, command.description);
      } else {
        this.logger.log(
          `Setting not found for key: ${command.key}. Creating new...`,
        );
        setting = DefaultSettingFactory.createNewDefaultSetting(
          command.key,
          command.value,
          command.type,
          command.description,
        );
      }

      const savedSetting = await this.defaultSettingRepository.save(setting);

      this.logger.log(`Default setting saved successfully: ${savedSetting.id}`);

      this.eventBus.publish(
        new DefaultSettingUpdatedEvent(
          savedSetting.id,
          savedSetting.key,
          savedSetting.value,
          savedSetting.type,
          savedSetting.description,
          savedSetting.createdAt,
          savedSetting.updatedAt,
        ),
      );

      return {
        message: 'Default setting updated successfully.',
        data: savedSetting,
      };
    } catch (error) {
      this.logger.error(`error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
