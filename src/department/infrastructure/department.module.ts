import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { EventSourcingModule } from 'event-sourcing-nestjs';
import { DatabaseModule } from 'src/common/database';

import { CommandHandlers } from '../application/command';
import { DepartmentController } from './controller/department.controller';
import { DepartmentEventStore } from './eventstore';
import { ProjectionHandlers } from './read-model/projection';
import { DepartmentProviders } from './department.providers';
import { DepartmentService } from './service/department.service';

@Module({
  controllers: [DepartmentController],
  imports: [CqrsModule, DatabaseModule, EventSourcingModule.forFeature()],
  providers: [
    ...CommandHandlers,
    ...ProjectionHandlers,
    ...DepartmentProviders,
    DepartmentService,
    DepartmentEventStore,
  ],
})
export class DepartmentModule {}