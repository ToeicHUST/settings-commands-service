import { DefaultSettingRepositoryPort } from './default-setting.repository.port';

describe('DefaultSettingRepositoryPort', () => {
  it('should be an abstract class', () => {
    expect(typeof DefaultSettingRepositoryPort).toBe('function');
    expect(DefaultSettingRepositoryPort.prototype.save).toBeUndefined();
    expect(DefaultSettingRepositoryPort.prototype.getOneByKey).toBeUndefined();
  });

  it('should be implementable as a concrete class', () => {
    class MockRepository extends DefaultSettingRepositoryPort {
      async save(entity: any) {
        return entity;
      }
      async getOneByKey(key: string) {
        return null;
      }
    }

    const repo = new MockRepository();
    expect(repo).toBeInstanceOf(DefaultSettingRepositoryPort);
  });
});
