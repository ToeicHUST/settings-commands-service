import { Test, TestingModule } from '@nestjs/testing';
import {
  DefaultSettingUpdatedEvent,
  EventPublisherPort,
} from '@toeichust/common';
import { DefaultSettingFactory } from '../../domain/factories/default-setting.factory';
import { DefaultSettingUpdatedEventHandler } from './default-setting-updated.event-handler';

describe('DefaultSettingUpdatedEventHandler', () => {
  let handler: DefaultSettingUpdatedEventHandler;
  let mockPublisher: { publish: jest.Mock };

  beforeEach(async () => {
    mockPublisher = { publish: jest.fn().mockResolvedValue(undefined) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DefaultSettingUpdatedEventHandler,
        { provide: EventPublisherPort, useValue: mockPublisher },
      ],
    }).compile();

    handler = module.get<DefaultSettingUpdatedEventHandler>(
      DefaultSettingUpdatedEventHandler,
    );
  });

  it('should call eventPublisherPort.publish with correct payload', async () => {
    const setting = DefaultSettingFactory.createNewDefaultSetting(
      'MAX_ATTEMPTS',
      '5',
      'number',
      'Max attempts',
    );

    const event = new DefaultSettingUpdatedEvent(
      setting.id,
      setting.key,
      setting.value,
      setting.type,
      setting.description,
      setting.createdAt,
      setting.updatedAt,
    );

    await handler.handle(event);

    expect(mockPublisher.publish).toHaveBeenCalledTimes(1);
    expect(mockPublisher.publish).toHaveBeenCalledWith(event);
  });
});
