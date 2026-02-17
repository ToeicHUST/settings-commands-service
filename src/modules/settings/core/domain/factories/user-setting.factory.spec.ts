import { UserSetting } from '../entities/user-setting';
import { UserSettingFactory } from './user-setting.factory';

describe('UserSettingFactory', () => {
  describe('createNewUserSetting', () => {
    it('should create a new UserSetting with generated ID and timestamps', () => {
      const setting = UserSettingFactory.createNewUserSetting(
        'user-123',
        'NOTIFICATIONS_ENABLED',
        'true',
      );

      expect(setting).toBeDefined();
      expect(setting).toBeInstanceOf(UserSetting);
      expect(setting.id).toBeDefined();
      expect(setting.userId).toBe('user-123');
      expect(setting.key).toBe('NOTIFICATIONS_ENABLED');
      expect(setting.value).toBe('true');
      expect(setting.createdAt).toBeDefined();
      expect(setting.updatedAt).toBeDefined();
    });
  });
});
