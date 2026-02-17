import { Test, TestingModule } from '@nestjs/testing';
import { EventPublisherPort, UserSettingUpdatedEvent } from '@toeichust/common';
import { UserSettingFactory } from '../../domain/factories/user-setting.factory';
import { UserSettingUpdatedEventHandler } from './user-setting-updated.event-handler';

describe('UserSettingUpdatedEventHandler', () => {
  let handler: UserSettingUpdatedEventHandler;
  let mockPublisher: { publish: jest.Mock };

  beforeEach(async () => {
    mockPublisher = { publish: jest.fn().mockResolvedValue(undefined) };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserSettingUpdatedEventHandler,
        { provide: EventPublisherPort, useValue: mockPublisher },
      ],
    }).compile();

    handler = module.get<UserSettingUpdatedEventHandler>(
      UserSettingUpdatedEventHandler,
    );
  });

  it('should call eventPublisherPort.publish with correct payload', async () => {
    const setting = UserSettingFactory.createNewUserSetting(
      'user-1',
      'NOTIFICATIONS_ENABLED',
      'true',
    );

    const event = new UserSettingUpdatedEvent(
      setting.id,
      setting.key,
      setting.value,
      setting.createdAt,
      setting.updatedAt,
      setting.userId,
    );

    await handler.handle(event);

    expect(mockPublisher.publish).toHaveBeenCalledTimes(1);
    expect(mockPublisher.publish).toHaveBeenCalledWith(event);
  });
});
