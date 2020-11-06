import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";
import { CommandHandlers } from "../application/command";
import { CreateDepartmentHandler } from "../application/command/create-department.handler";
import { DepartmentController } from "./controller/department.controller";
import { DepartmentProviders } from "./department.providers";
import { DepartmentsEventStore } from "./event-store/departments.event-store";
import { DepartmentService } from "./service/department.service";

@Module({
    imports: [CqrsModule, EventSourcingModule.forFeature()],
    controllers: [DepartmentController],
    providers: [ DepartmentService, DepartmentsEventStore, ... CommandHandlers , DepartmentService , ... DepartmentProviders],
    
})
export class DepartmentModule{}