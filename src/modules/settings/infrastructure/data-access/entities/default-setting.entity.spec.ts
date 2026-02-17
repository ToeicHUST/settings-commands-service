import { DefaultSettingEntity } from './default-setting.entity';

describe('DefaultSettingEntity', () => {
  it('should be defined and instantiable', () => {
    const entity = new DefaultSettingEntity();
    expect(entity).toBeDefined();
  });

  it('should accept all mapped properties', () => {
    const entity = new DefaultSettingEntity();
    entity.id = 'uuid-123';
    entity.key = 'MAX_ATTEMPTS';
    entity.value = '5';
    entity.type = 'number';
    entity.description = 'Max attempts';
    entity.createdAt = new Date();
    entity.updatedAt = new Date();

    expect(entity.key).toBe('MAX_ATTEMPTS');
  });
});
