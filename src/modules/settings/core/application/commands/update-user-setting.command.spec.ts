import { UpdateUserSettingCommand } from './update-user-setting.command';

describe('UpdateUserSettingCommand', () => {
  it('should be defined and hold all constructor properties', () => {
    const command = new UpdateUserSettingCommand(
      'user-1',
      'NOTIFICATIONS_ENABLED',
      'true',
    );

    expect(command).toBeDefined();
    expect(command.userId).toBe('user-1');
    expect(command.key).toBe('NOTIFICATIONS_ENABLED');
    expect(command.value).toBe('true');
  });
});
