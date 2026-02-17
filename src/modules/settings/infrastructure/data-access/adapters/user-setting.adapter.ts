import { SettingKey } from '@toeichust/common';
import { UserSetting } from '../../../core/domain/entities/user-setting';
import { UserSettingEntity } from '../entities/user-setting.entity';

export class UserSettingAdapter {
  static toDomain(entity: UserSettingEntity): UserSetting {
    return new UserSetting({
      id: entity.id,
      userId: entity.userId,
      key: new SettingKey(entity.key),
      value: entity.value,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
    });
  }

  static toPersistence(domain: UserSetting): UserSettingEntity {
    const entity = new UserSettingEntity();
    entity.id = domain.id;
    entity.userId = domain.userId;
    entity.key = domain.key;
    entity.value = domain.value;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
