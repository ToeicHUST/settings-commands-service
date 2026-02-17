import { UpdateDefaultSettingController } from './http/controllers/update-default-setting.controller';
import { UpdateUserSettingController } from './http/controllers/update-user-setting.controller';

export const SettingsApi = {
  resolvers: [],
  controllers: [UpdateDefaultSettingController, UpdateUserSettingController],
};
