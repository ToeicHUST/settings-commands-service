import { UserSetting } from '../../../core/domain/entities/user-setting';
import { UserSettingFactory } from '../../../core/domain/factories/user-setting.factory';
import { UserSettingEntity } from '../entities/user-setting.entity';
import { UserSettingAdapter } from './user-setting.adapter';

describe('UserSettingAdapter', () => {
  describe('toDomain', () => {
    it('should convert entity to domain', () => {
      const entity = new UserSettingEntity();
      entity.id = 'uuid-1';
      entity.userId = 'user-1';
      entity.key = 'NOTIFICATIONS_ENABLED';
      entity.value = 'true';
      entity.createdAt = new Date();
      entity.updatedAt = new Date();

      const domain = UserSettingAdapter.toDomain(entity);

      expect(domain).toBeInstanceOf(UserSetting);
      expect(domain.userId).toBe('user-1');
    });
  });

  describe('toPersistence', () => {
    it('should convert domain to entity', () => {
      const domain = UserSettingFactory.createNewUserSetting(
        'user-1',
        'NOTIFICATIONS_ENABLED',
        'true',
      );

      const entity = UserSettingAdapter.toPersistence(domain);

      expect(entity).toBeInstanceOf(UserSettingEntity);
      expect(entity.userId).toBe('user-1');
    });
  });
});
