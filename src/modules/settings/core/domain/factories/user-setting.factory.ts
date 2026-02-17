import { SettingKey } from '@toeichust/common';
import { randomUUID } from 'crypto';
import { UserSetting } from '../entities/user-setting';

export class UserSettingFactory {
  static createNewUserSetting(
    userId: string,
    key: string,
    value: string,
  ): UserSetting {
    return new UserSetting({
      id: randomUUID(),
      userId: userId,
      key: new SettingKey(key),
      value: value,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
