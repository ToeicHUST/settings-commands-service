import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserSettingFactory } from '../../../core/domain/factories/user-setting.factory';
import { UserSettingAdapter } from '../adapters/user-setting.adapter';
import { UserSettingEntity } from '../entities/user-setting.entity';
import { UserSettingOrmRepository } from './user-setting.orm-repository';

describe('UserSettingOrmRepository', () => {
  let repo: UserSettingOrmRepository;
  let mockTypeOrmRepo: jest.Mocked<Repository<UserSettingEntity>>;

  beforeEach(async () => {
    mockTypeOrmRepo = {
      save: jest.fn(),
      findOneBy: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSettingOrmRepository,
        {
          provide: getRepositoryToken(UserSettingEntity),
          useValue: mockTypeOrmRepo,
        },
      ],
    }).compile();

    repo = module.get<UserSettingOrmRepository>(UserSettingOrmRepository);
  });

  describe('save', () => {
    it('should persist entity and return domain object', async () => {
      const domain = UserSettingFactory.createNewUserSetting(
        'user-1',
        'NOTIFICATIONS_ENABLED',
        'true',
      );
      const ormEntity = UserSettingAdapter.toPersistence(domain);

      mockTypeOrmRepo.save.mockResolvedValue(ormEntity);

      const result = await repo.save(domain);

      expect(mockTypeOrmRepo.save).toHaveBeenCalled();
      expect(result.userId).toBe('user-1');
    });
  });

  describe('getOneByUserIdAndKey', () => {
    it('should return domain when found', async () => {
      const entity = new UserSettingEntity();
      entity.id = 'found-id';
      entity.userId = 'user-1';
      entity.key = 'NOTIFICATIONS_ENABLED';
      entity.value = 'true';
      entity.createdAt = new Date();
      entity.updatedAt = new Date();

      mockTypeOrmRepo.findOneBy.mockResolvedValue(entity);

      const result = await repo.getOneByUserIdAndKey(
        'user-1',
        'NOTIFICATIONS_ENABLED',
      );

      expect(result).not.toBeNull();
      expect(result!.userId).toBe('user-1');
      expect(result!.key).toBe('NOTIFICATIONS_ENABLED');
    });

    it('should return null when not found', async () => {
      mockTypeOrmRepo.findOneBy.mockResolvedValue(null);

      const result = await repo.getOneByUserIdAndKey('user-1', 'MISSING_KEY');

      expect(result).toBeNull();
    });
  });
});
