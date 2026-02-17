import { DefaultSettingFactory } from '../factories/default-setting.factory';

describe('DefaultSetting', () => {
  it('should initialize successfully via Factory', () => {
    const setting = DefaultSettingFactory.createNewDefaultSetting(
      'MAX_ATTEMPTS',
      '5',
      'number',
      'Maximum login attempts',
    );

    expect(setting).toBeDefined();
    expect(setting.id).toBeDefined();
    expect(setting.key).toBe('MAX_ATTEMPTS');
    expect(setting.value).toBe('5');
    expect(setting.type).toBe('number');
    expect(setting.description).toBe('Maximum login attempts');
  });

  it('should update data and updatedAt timestamp correctly', () => {
    const setting = DefaultSettingFactory.createNewDefaultSetting(
      'MAX_ATTEMPTS',
      '3',
      'number',
      'Max attempts',
    );

    const oldUpdatedAt = setting.updatedAt;

    return new Promise((resolve) => setTimeout(resolve, 10)).then(() => {
      setting.updateSetting('5', 'number', 'Maximum login attempts');

      expect(setting.value).toBe('5');
      expect(setting.description).toBe('Maximum login attempts');
      expect(setting.updatedAt.getTime()).toBeGreaterThan(
        oldUpdatedAt.getTime(),
      );
    });
  });
});
