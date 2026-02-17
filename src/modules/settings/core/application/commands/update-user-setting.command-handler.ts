import { Logger, NotFoundException } from '@nestjs/common';
import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { SettingKey, UserSettingUpdatedEvent } from '@toeichust/common';
import { UserSetting } from '../../domain/entities/user-setting';
import { UserSettingFactory } from '../../domain/factories/user-setting.factory';
import { DefaultSettingRepositoryPort } from '../ports/data-access/default-setting.repository.port';
import { UserSettingRepositoryPort } from '../ports/data-access/user-setting.repository.port';
import { UpdateUserSettingCommand } from './update-user-setting.command';

@CommandHandler(UpdateUserSettingCommand)
export class UpdateUserSettingCommandHandler implements ICommandHandler<UpdateUserSettingCommand> {
  private readonly logger = new Logger(UpdateUserSettingCommandHandler.name);

  constructor(
    private readonly userSettingRepository: UserSettingRepositoryPort,
    private readonly defaultSettingRepository: DefaultSettingRepositoryPort,
    private readonly eventBus: EventBus,
  ) {}

  async execute(
    command: UpdateUserSettingCommand,
  ): Promise<{ message: string; data: UserSetting }> {
    try {
      this.logger.debug(`command: ${JSON.stringify(command)}`);

      const defaultSetting = await this.defaultSettingRepository.getOneByKey(
        new SettingKey(command.key).value,
      );

      if (!defaultSetting) {
        throw new NotFoundException(
          `Setting key '${command.key}' does not exist in default settings`,
        );
      }

      let userSetting = await this.userSettingRepository.getOneByUserIdAndKey(
        command.userId,
        command.key,
      );

      if (userSetting) {
        this.logger.log(
          `User setting found for userId: ${command.userId}, key: ${command.key}. Updating...`,
        );
        userSetting.updateValue(command.value);
      } else {
        this.logger.log(
          `User setting not found. Creating new for userId: ${command.userId}, key: ${command.key}`,
        );
        userSetting = UserSettingFactory.createNewUserSetting(
          command.userId,
          command.key,
          command.value,
        );
      }

      const savedSetting = await this.userSettingRepository.save(userSetting);

      this.logger.log(`User setting saved successfully: ${savedSetting.id}`);

      this.eventBus.publish(
        new UserSettingUpdatedEvent(
          savedSetting.id,
          savedSetting.key,
          savedSetting.value,
          savedSetting.createdAt,
          savedSetting.updatedAt,
          savedSetting.userId,
        ),
      );

      return {
        message: 'User setting updated successfully.',
        data: savedSetting,
      };
    } catch (error) {
      this.logger.error(`error: ${error.message}`, error.stack);
      throw error;
    }
  }
}
