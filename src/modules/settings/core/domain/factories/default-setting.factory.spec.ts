import { DefaultSetting } from '../entities/default-setting';
import { DefaultSettingFactory } from './default-setting.factory';

describe('DefaultSettingFactory', () => {
  describe('createNewDefaultSetting', () => {
    it('should create a new DefaultSetting with generated ID and timestamps', () => {
      const setting = DefaultSettingFactory.createNewDefaultSetting(
        'MAX_ATTEMPTS',
        '5',
        'number',
        'Maximum login attempts',
      );

      expect(setting).toBeDefined();
      expect(setting).toBeInstanceOf(DefaultSetting);
      expect(setting.id).toBeDefined();
      expect(setting.key).toBe('MAX_ATTEMPTS');
      expect(setting.value).toBe('5');
      expect(setting.type).toBe('number');
      expect(setting.description).toBe('Maximum login attempts');
      expect(setting.createdAt).toBeDefined();
      expect(setting.updatedAt).toBeDefined();
    });
  });
});
