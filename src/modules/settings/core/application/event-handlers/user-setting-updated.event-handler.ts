import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventPublisherPort, UserSettingUpdatedEvent } from '@toeichust/common';

@EventsHandler(UserSettingUpdatedEvent)
export class UserSettingUpdatedEventHandler implements IEventHandler<UserSettingUpdatedEvent> {
  private readonly logger = new Logger(UserSettingUpdatedEventHandler.name);

  constructor(private readonly eventPublisherPort: EventPublisherPort) {}

  async handle(event: UserSettingUpdatedEvent): Promise<void> {
    try {
      this.logger.debug(`event: ${JSON.stringify(event)}`);

      await this.eventPublisherPort.publish(event);

      this.logger.log(`Event published successfully.`);
    } catch (error) {
      this.logger.error(`error: ${error.message}`, error.stack);
    }
  }
}
