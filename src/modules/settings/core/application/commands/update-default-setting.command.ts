import { ICommand } from '@nestjs/cqrs';

export class UpdateDefaultSettingCommand implements ICommand {
  constructor(
    public readonly key: string,
    public readonly value: string,
    public readonly type: string,
    public readonly description: string,
  ) {}
}
