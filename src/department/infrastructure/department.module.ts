import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";
import { DatabaseModule } from "src/common/database";

import { CommandHandlers } from "../application/command";
import { DepartmentController } from "./controller/department.controller";
import { DepartmentProviders } from "./department.providers";
import { DepartmentsEventStore } from "./event-store/departments.event-store";
import { ProjectionHandlers } from "./read-model/projection";
import { DepartmentService } from "./service/department.service";

@Module({
    imports: [CqrsModule, EventSourcingModule.forFeature(), DatabaseModule],
    controllers: [DepartmentController],
    providers: [
        DepartmentService,
        DepartmentsEventStore,
        ...CommandHandlers,
        DepartmentService,
        ...DepartmentProviders,
        ...ProjectionHandlers,
    ],

})
export class DepartmentModule { }