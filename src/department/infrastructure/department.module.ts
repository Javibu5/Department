import { Module } from "@nestjs/common";
import { DepartmentController } from "./controller/department.controller";
import { DepartmentService } from "./service/department.service";

@Module({
    controllers: [DepartmentController],
    providers: [ DepartmentService],
})
export class DepartmentModule{
    
}