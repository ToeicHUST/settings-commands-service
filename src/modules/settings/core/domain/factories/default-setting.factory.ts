import { SettingKey } from '@toeichust/common';
import { randomUUID } from 'crypto';
import { DefaultSetting } from '../entities/default-setting';

export class DefaultSettingFactory {
  static createNewDefaultSetting(
    key: string,
    value: string,
    type: string,
    description: string,
  ): DefaultSetting {
    return new DefaultSetting({
      id: randomUUID(),
      key: new SettingKey(key),
      value: value,
      type: type,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
