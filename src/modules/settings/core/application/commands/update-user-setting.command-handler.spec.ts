import { NotFoundException } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { InvalidSettingKeyException } from '@toeichust/common';
import { DefaultSettingFactory } from '../../domain/factories/default-setting.factory';
import { UserSettingFactory } from '../../domain/factories/user-setting.factory';
import { DefaultSettingRepositoryPort } from '../ports/data-access/default-setting.repository.port';
import { UserSettingRepositoryPort } from '../ports/data-access/user-setting.repository.port';
import { UpdateUserSettingCommand } from './update-user-setting.command';
import { UpdateUserSettingCommandHandler } from './update-user-setting.command-handler';

describe('UpdateUserSettingCommandHandler', () => {
  let handler: UpdateUserSettingCommandHandler;
  let mockUserRepository: jest.Mocked<UserSettingRepositoryPort>;
  let mockDefaultRepository: jest.Mocked<DefaultSettingRepositoryPort>;
  let mockEventBus: { publish: jest.Mock };

  beforeEach(async () => {
    mockUserRepository = {
      save: jest.fn(),
      getOneByUserIdAndKey: jest.fn(),
    } as any;

    mockDefaultRepository = {
      getOneByKey: jest.fn(),
    } as any;

    mockEventBus = { publish: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateUserSettingCommandHandler,
        { provide: UserSettingRepositoryPort, useValue: mockUserRepository },
        {
          provide: DefaultSettingRepositoryPort,
          useValue: mockDefaultRepository,
        },
        { provide: EventBus, useValue: mockEventBus },
      ],
    }).compile();

    handler = module.get<UpdateUserSettingCommandHandler>(
      UpdateUserSettingCommandHandler,
    );
  });

  it('should update user setting when key exists in defaults', async () => {
    const defaultSetting = DefaultSettingFactory.createNewDefaultSetting(
      'NOTIFICATIONS_ENABLED',
      'false',
      'boolean',
      'Enable notifications',
    );

    const existingUserSetting = UserSettingFactory.createNewUserSetting(
      'user-1',
      'NOTIFICATIONS_ENABLED',
      'false',
    );

    mockDefaultRepository.getOneByKey.mockResolvedValue(defaultSetting);
    mockUserRepository.getOneByUserIdAndKey.mockResolvedValue(
      existingUserSetting,
    );
    mockUserRepository.save.mockImplementation(async (s) => s);

    const command = new UpdateUserSettingCommand(
      'user-1',
      'NOTIFICATIONS_ENABLED',
      'true',
    );

    const result = await handler.execute(command);

    expect(mockDefaultRepository.getOneByKey).toHaveBeenCalledWith(
      'NOTIFICATIONS_ENABLED',
    );
    expect(mockUserRepository.save).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalled();
    expect(result.message).toBe('User setting updated successfully.');
  });

  it('should throw error when key does not exist in defaults', async () => {
    mockDefaultRepository.getOneByKey.mockResolvedValue(null);

    const command = new UpdateUserSettingCommand(
      'user-1',
      'INVALID_KEY',
      'value',
    );

    await expect(handler.execute(command)).rejects.toThrow(NotFoundException);
  });

  it('should throw error for invalid key format', async () => {
    const command = new UpdateUserSettingCommand(
      'user-1',
      'invalid-key',
      'value',
    );

    await expect(handler.execute(command)).rejects.toThrow(
      InvalidSettingKeyException,
    );
  });
});
