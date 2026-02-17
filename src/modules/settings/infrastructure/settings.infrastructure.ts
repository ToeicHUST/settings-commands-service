import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EventPublisherPort,
  UpstashQstashEventPublisherAdapter,
  WebhookEventPublisherAdapter,
} from '@toeichust/common';
import { DefaultSettingRepositoryPort } from '../core/application/ports/data-access/default-setting.repository.port';
import { UserSettingRepositoryPort } from '../core/application/ports/data-access/user-setting.repository.port';
import { DefaultSettingEntity } from './data-access/entities/default-setting.entity';
import { UserSettingEntity } from './data-access/entities/user-setting.entity';
import { DefaultSettingOrmRepository } from './data-access/repositories/default-setting.orm-repository';
import { UserSettingOrmRepository } from './data-access/repositories/user-setting.orm-repository';

const isUseWebhook = true;
// const isUseWebhook = false;

export const SettingsInfrastructure = {
  imports: [
    ...(isUseWebhook ? [HttpModule] : []),
    TypeOrmModule.forFeature([DefaultSettingEntity, UserSettingEntity]),
  ],
  providers: [
    {
      provide: EventPublisherPort,
      useClass: isUseWebhook
        ? WebhookEventPublisherAdapter
        : UpstashQstashEventPublisherAdapter,
    },
    {
      provide: DefaultSettingRepositoryPort,
      useClass: DefaultSettingOrmRepository,
    },
    {
      provide: UserSettingRepositoryPort,
      useClass: UserSettingOrmRepository,
    },
  ],
};
