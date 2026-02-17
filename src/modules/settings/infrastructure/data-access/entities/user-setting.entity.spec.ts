import { UserSettingEntity } from './user-setting.entity';

describe('UserSettingEntity', () => {
  it('should be defined and instantiable', () => {
    const entity = new UserSettingEntity();
    expect(entity).toBeDefined();
  });

  it('should accept all mapped properties', () => {
    const entity = new UserSettingEntity();
    entity.id = 'uuid-123';
    entity.userId = 'user-456';
    entity.key = 'NOTIFICATIONS_ENABLED';
    entity.value = 'true';
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    expect(entity.userId).toBe('user-456');
  });
});
