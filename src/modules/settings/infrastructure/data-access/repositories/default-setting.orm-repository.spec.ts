import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DefaultSettingFactory } from '../../../core/domain/factories/default-setting.factory';
import { DefaultSettingAdapter } from '../adapters/default-setting.adapter';
import { DefaultSettingEntity } from '../entities/default-setting.entity';
import { DefaultSettingOrmRepository } from './default-setting.orm-repository';

describe('DefaultSettingOrmRepository', () => {
  let repo: DefaultSettingOrmRepository;
  let mockTypeOrmRepo: jest.Mocked<Repository<DefaultSettingEntity>>;

  beforeEach(async () => {
    mockTypeOrmRepo = {
      save: jest.fn(),
      findOneBy: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DefaultSettingOrmRepository,
        {
          provide: getRepositoryToken(DefaultSettingEntity),
          useValue: mockTypeOrmRepo,
        },
      ],
    }).compile();

    repo = module.get<DefaultSettingOrmRepository>(DefaultSettingOrmRepository);
  });

  describe('save', () => {
    it('should persist entity and return domain object', async () => {
      const domain = DefaultSettingFactory.createNewDefaultSetting(
        'MAX_ATTEMPTS',
        '5',
        'number',
        'Max attempts',
      );
      const ormEntity = DefaultSettingAdapter.toPersistence(domain);

      mockTypeOrmRepo.save.mockResolvedValue(ormEntity);

      const result = await repo.save(domain);

      expect(mockTypeOrmRepo.save).toHaveBeenCalled();
      expect(result.key).toBe('MAX_ATTEMPTS');
    });
  });

  describe('getOneByKey', () => {
    it('should return domain when found', async () => {
      const entity = new DefaultSettingEntity();
      entity.id = 'found-id';
      entity.key = 'MAX_ATTEMPTS';
      entity.value = '5';
      entity.type = 'number';
      entity.description = 'Max attempts';
      entity.createdAt = new Date();
      entity.updatedAt = new Date();

      mockTypeOrmRepo.findOneBy.mockResolvedValue(entity);

      const result = await repo.getOneByKey('MAX_ATTEMPTS');

      expect(result).not.toBeNull();
      expect(result!.key).toBe('MAX_ATTEMPTS');
    });

    it('should return null when not found', async () => {
      mockTypeOrmRepo.findOneBy.mockResolvedValue(null);

      const result = await repo.getOneByKey('MISSING_KEY');

      expect(result).toBeNull();
    });
  });
});
