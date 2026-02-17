import { UpdateDefaultSettingCommand } from './update-default-setting.command';

describe('UpdateDefaultSettingCommand', () => {
  it('should be defined and hold all constructor properties', () => {
    const command = new UpdateDefaultSettingCommand(
      'MAX_ATTEMPTS',
      '5',
      'number',
      'Max attempts',
    );

    expect(command).toBeDefined();
    expect(command.key).toBe('MAX_ATTEMPTS');
    expect(command.value).toBe('5');
    expect(command.type).toBe('number');
    expect(command.description).toBe('Max attempts');
  });
});
