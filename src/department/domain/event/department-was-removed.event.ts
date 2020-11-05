import { StorableEvent } from 'event-sourcing-nestjs';

export class DepartmentWasRemoved extends StorableEvent {
  eventAggregate = 'scope';
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}