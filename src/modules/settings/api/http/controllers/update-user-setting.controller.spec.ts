import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { BaseResponseDto } from '@toeichust/common';
import { UpdateUserSettingCommand } from '../../../core/application/commands/update-user-setting.command';
import { UpdateUserSettingController } from './update-user-setting.controller';

describe('UpdateUserSettingController', () => {
  let controller: UpdateUserSettingController;
  let commandBus: CommandBus;

  const mockExecute = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateUserSettingController],
      providers: [
        {
          provide: CommandBus,
          useValue: { execute: mockExecute },
        },
      ],
    }).compile();

    controller = module.get<UpdateUserSettingController>(
      UpdateUserSettingController,
    );
    commandBus = module.get<CommandBus>(CommandBus);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateUserSetting', () => {
    const userId = 'user-123';
    const dto = {
      key: 'NOTIFICATIONS_ENABLED',
      value: 'true',
    };

    const expectedResult = {
      data: {
        id: 'user-setting-id-1',
        userId: userId,
        key: dto.key,
        value: dto.value,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    it('should map DTO to Command and return result correctly', async () => {
      mockExecute.mockResolvedValue(expectedResult);

      const result = await controller.updateUserSetting(userId, dto);

      expect(mockExecute).toHaveBeenCalledWith(
        new UpdateUserSettingCommand(userId, dto.key, dto.value),
      );

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(BaseResponseDto);
      expect(result.message).toBe('User setting updated successfully');
      expect(result.data.userId).toBe(userId);
      expect(result.data.key).toBe(dto.key);
    });
  });
});
