import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { BaseResponseDto } from '@toeichust/common';
import { UpdateDefaultSettingCommand } from '../../../core/application/commands/update-default-setting.command';
import { UpdateDefaultSettingController } from './update-default-setting.controller';

describe('UpdateDefaultSettingController', () => {
  let controller: UpdateDefaultSettingController;
  let commandBus: CommandBus;

  const mockExecute = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateDefaultSettingController],
      providers: [
        {
          provide: CommandBus,
          useValue: { execute: mockExecute },
        },
      ],
    }).compile();

    controller = module.get<UpdateDefaultSettingController>(
      UpdateDefaultSettingController,
    );
    commandBus = module.get<CommandBus>(CommandBus);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('updateDefaultSetting', () => {
    const dto = {
      key: 'MAX_LOGIN_ATTEMPTS',
      value: '5',
      type: 'number',
      description: 'Maximum login attempts',
    };

    const expectedResult = {
      data: {
        id: 'setting-id-1',
        key: dto.key,
        value: dto.value,
        type: dto.type,
        description: dto.description,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    it('should map DTO to Command and return result correctly', async () => {
      mockExecute.mockResolvedValue(expectedResult);

      const result = await controller.updateDefaultSetting(dto);

      expect(mockExecute).toHaveBeenCalledWith(
        new UpdateDefaultSettingCommand(
          dto.key,
          dto.value,
          dto.type,
          dto.description,
        ),
      );

      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(BaseResponseDto);
      expect(result.message).toBe('Default setting updated successfully');
      expect(result.data.key).toBe(dto.key);
      expect(result.data.value).toBe(dto.value);
    });
  });
});
