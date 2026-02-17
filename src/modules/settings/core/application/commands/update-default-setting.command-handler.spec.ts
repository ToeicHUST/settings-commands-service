import { EventBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { InvalidSettingKeyException } from '@toeichust/common';
import { DefaultSettingFactory } from '../../domain/factories/default-setting.factory';
import { DefaultSettingRepositoryPort } from '../ports/data-access/default-setting.repository.port';
import { UpdateDefaultSettingCommand } from './update-default-setting.command';
import { UpdateDefaultSettingCommandHandler } from './update-default-setting.command-handler';

describe('UpdateDefaultSettingCommandHandler', () => {
  let handler: UpdateDefaultSettingCommandHandler;
  let mockRepository: jest.Mocked<DefaultSettingRepositoryPort>;
  let mockEventBus: { publish: jest.Mock };

  beforeEach(async () => {
    mockRepository = {
      save: jest.fn(),
      getOneByKey: jest.fn(),
    } as any;

    mockEventBus = { publish: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateDefaultSettingCommandHandler,
        { provide: DefaultSettingRepositoryPort, useValue: mockRepository },
        { provide: EventBus, useValue: mockEventBus },
      ],
    }).compile();

    handler = module.get<UpdateDefaultSettingCommandHandler>(
      UpdateDefaultSettingCommandHandler,
    );
  });

  it('should update setting and publish event', async () => {
    const existingSetting = DefaultSettingFactory.createNewDefaultSetting(
      'MAX_ATTEMPTS',
      '3',
      'number',
      'Max attempts',
    );
    mockRepository.getOneByKey.mockResolvedValue(existingSetting);
    mockRepository.save.mockImplementation(async (s) => s);

    const command = new UpdateDefaultSettingCommand(
      'MAX_ATTEMPTS',
      '5',
      'number',
      'Max login attempts',
    );

    const result = await handler.execute(command);

    expect(mockRepository.getOneByKey).toHaveBeenCalledWith('MAX_ATTEMPTS');
    expect(mockRepository.save).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalled();
    expect(result.message).toBe('Default setting updated successfully.');
  });

  it('should create new setting when not found', async () => {
    mockRepository.getOneByKey.mockResolvedValue(null);
    mockRepository.save.mockImplementation(async (s) => s);

    const command = new UpdateDefaultSettingCommand(
      'NEW_KEY',
      'value',
      'string',
      'New setting',
    );

    const result = await handler.execute(command);

    expect(mockRepository.save).toHaveBeenCalled();
    expect(mockEventBus.publish).toHaveBeenCalled();
    expect(result.message).toBe('Default setting updated successfully.');
  });

  it('should throw error for invalid key format', async () => {
    const command = new UpdateDefaultSettingCommand(
      'invalid-key',
      'value',
      'string',
      'Description',
    );

    await expect(handler.execute(command)).rejects.toThrow(
      InvalidSettingKeyException,
    );
  });
});
