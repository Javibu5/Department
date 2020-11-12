import { StorableEvent } from 'event-sourcing-nestjs';

export class DepartmentWasDeleted extends StorableEvent {
  eventAggregate = 'department';
  eventVersion = 1;

  constructor(public readonly id: string) {
    super();
  }
}