import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { EventSourcingModule } from "event-sourcing-nestjs";
import { DepartmentController } from "./controller/department.controller";
import { DepartmentsEventStore } from "./event-store/departments.event-store";
import { DepartmentService } from "./service/department.service";

@Module({
    imports: [CqrsModule, EventSourcingModule.forFeature()],
    controllers: [DepartmentController],
    providers: [ DepartmentService, DepartmentsEventStore],
    
})
export class DepartmentModule{
    
}