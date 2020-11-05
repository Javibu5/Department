
import { StorableEvent } from 'event-sourcing-nestjs';

export class DepartmentWasRenamed extends StorableEvent {
  eventAggregate = 'scope';
  eventVersion = 1;

  constructor(public readonly id: string, public readonly name: string) {
    super();
  }
}