import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import {
  DefaultSettingUpdatedEvent,
  EventPublisherPort,
} from '@toeichust/common';

@EventsHandler(DefaultSettingUpdatedEvent)
export class DefaultSettingUpdatedEventHandler implements IEventHandler<DefaultSettingUpdatedEvent> {
  private readonly logger = new Logger(DefaultSettingUpdatedEventHandler.name);

  constructor(private readonly eventPublisherPort: EventPublisherPort) {}

  async handle(event: DefaultSettingUpdatedEvent): Promise<void> {
    try {
      this.logger.debug(`event: ${JSON.stringify(event)}`);

      await this.eventPublisherPort.publish(event);

      this.logger.log(`Event published successfully.`);
    } catch (error) {
      this.logger.error(`error: ${error.message}`, error.stack);
    }
  }
}
