import { Module } from '@nestjs/common';
import { SettingsApi } from './api/settings.api';
import { SettingsApplication } from './core/application/settings.application';
import { SettingsInfrastructure } from './infrastructure/settings.infrastructure';

@Module({
  imports: [...SettingsInfrastructure.imports, ...SettingsApplication.imports],
  controllers: [...SettingsApi.controllers],
  providers: [
    ...SettingsApi.resolvers,
    ...SettingsInfrastructure.providers,
    ...SettingsApplication.providers,
  ],
  exports: [],
})
export class SettingsModule {}
