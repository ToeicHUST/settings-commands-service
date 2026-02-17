import { UserSettingFactory } from '../factories/user-setting.factory';

describe('UserSetting', () => {
  it('should initialize successfully via Factory', () => {
    const setting = UserSettingFactory.createNewUserSetting(
      'user-123',
      'NOTIFICATIONS_ENABLED',
      'true',
    );

    expect(setting).toBeDefined();
    expect(setting.id).toBeDefined();
    expect(setting.userId).toBe('user-123');
    expect(setting.key).toBe('NOTIFICATIONS_ENABLED');
    expect(setting.value).toBe('true');
  });

  it('should update value and updatedAt timestamp correctly', () => {
    const setting = UserSettingFactory.createNewUserSetting(
      'user-123',
      'NOTIFICATIONS_ENABLED',
      'false',
    );

    const oldUpdatedAt = setting.updatedAt;

    return new Promise((resolve) => setTimeout(resolve, 10)).then(() => {
      setting.updateValue('true');

      expect(setting.value).toBe('true');
      expect(setting.updatedAt.getTime()).toBeGreaterThan(
        oldUpdatedAt.getTime(),
      );
    });
  });
});
