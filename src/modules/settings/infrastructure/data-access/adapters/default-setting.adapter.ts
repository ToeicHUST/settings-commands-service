import { SettingKey } from '@toeichust/common';
import { DefaultSetting } from '../../../core/domain/entities/default-setting';
import { DefaultSettingEntity } from '../entities/default-setting.entity';

export class DefaultSettingAdapter {
  static toDomain(entity: DefaultSettingEntity): DefaultSetting {
    return new DefaultSetting({
      id: entity.id,
      key: new SettingKey(entity.key),
      value: entity.value,
      type: entity.type,
      description: entity.description,
      createdAt: new Date(entity.createdAt),
      updatedAt: new Date(entity.updatedAt),
    });
  }

  static toPersistence(domain: DefaultSetting): DefaultSettingEntity {
    const entity = new DefaultSettingEntity();
    entity.id = domain.id;
    entity.key = domain.key;
    entity.value = domain.value;
    entity.type = domain.type;
    entity.description = domain.description;
    entity.createdAt = domain.createdAt;
    entity.updatedAt = domain.updatedAt;
    return entity;
  }
}
