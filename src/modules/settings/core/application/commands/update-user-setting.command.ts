import { ICommand } from '@nestjs/cqrs';

export class UpdateUserSettingCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly key: string,
    public readonly value: string,
  ) {}
}
