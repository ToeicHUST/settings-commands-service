import { Type } from '@nestjs/common';
import {
  CqrsModule,
  ICommandHandler,
  IEventHandler,
  IQueryHandler,
} from '@nestjs/cqrs';
import { UpdateDefaultSettingCommandHandler } from './commands/update-default-setting.command-handler';
import { UpdateUserSettingCommandHandler } from './commands/update-user-setting.command-handler';
import { DefaultSettingUpdatedEventHandler } from './event-handlers/default-setting-updated.event-handler';
import { UserSettingUpdatedEventHandler } from './event-handlers/user-setting-updated.event-handler';

const commandHandlers: Type<ICommandHandler>[] = [
  UpdateDefaultSettingCommandHandler,
  UpdateUserSettingCommandHandler,
];

const eventHandlers: Type<IEventHandler>[] = [
  DefaultSettingUpdatedEventHandler,
  UserSettingUpdatedEventHandler,
];

const queryHandlers: Type<IQueryHandler>[] = [];

export const SettingsApplication = {
  imports: [CqrsModule],
  providers: [...commandHandlers, ...eventHandlers, ...queryHandlers],
};
