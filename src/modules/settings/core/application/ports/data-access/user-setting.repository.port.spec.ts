import { UserSettingRepositoryPort } from './user-setting.repository.port';

describe('UserSettingRepositoryPort', () => {
  it('should be an abstract class', () => {
    expect(typeof UserSettingRepositoryPort).toBe('function');
    expect(UserSettingRepositoryPort.prototype.save).toBeUndefined();
    expect(
      UserSettingRepositoryPort.prototype.getOneByUserIdAndKey,
    ).toBeUndefined();
  });

  it('should be implementable as a concrete class', () => {
    class MockRepository extends UserSettingRepositoryPort {
      async save(entity: any) {
        return entity;
      }
      async getOneByUserIdAndKey(userId: string, key: string) {
        return null;
      }
    }

    const repo = new MockRepository();
    expect(repo).toBeInstanceOf(UserSettingRepositoryPort);
  });
});
