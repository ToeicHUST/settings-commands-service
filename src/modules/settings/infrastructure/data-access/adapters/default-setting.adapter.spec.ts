import { DefaultSetting } from '../../../core/domain/entities/default-setting';
import { DefaultSettingFactory } from '../../../core/domain/factories/default-setting.factory';
import { DefaultSettingEntity } from '../entities/default-setting.entity';
import { DefaultSettingAdapter } from './default-setting.adapter';

describe('DefaultSettingAdapter', () => {
  describe('toDomain', () => {
    it('should convert entity to domain', () => {
      const entity = new DefaultSettingEntity();
      entity.id = 'uuid-1';
      entity.key = 'MAX_ATTEMPTS';
      entity.value = '5';
      entity.type = 'number';
      entity.description = 'Max attempts';
      entity.createdAt = new Date();
      entity.updatedAt = new Date();

      const domain = DefaultSettingAdapter.toDomain(entity);

      expect(domain).toBeInstanceOf(DefaultSetting);
      expect(domain.key).toBe('MAX_ATTEMPTS');
    });
  });

  describe('toPersistence', () => {
    it('should convert domain to entity', () => {
      const domain = DefaultSettingFactory.createNewDefaultSetting(
        'MAX_ATTEMPTS',
        '5',
        'number',
        'Max attempts',
      );

      const entity = DefaultSettingAdapter.toPersistence(domain);

      expect(entity).toBeInstanceOf(DefaultSettingEntity);
      expect(entity.key).toBe('MAX_ATTEMPTS');
    });
  });
});
