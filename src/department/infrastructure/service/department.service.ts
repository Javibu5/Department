import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { CreateDepartmentCommand } from "src/department/application/command/create-department.command";
import { Department } from "src/department/domain/model";
import { DepartmentView } from "../read-model/schema/department.schema";

@Injectable()
export class DepartmentService {
    constructor(private commandBus: CommandBus,
                private readonly departmentModel: Model<Department>){}

    async createDepartment(id : string, name : string): Promise<void> {
        this.commandBus.execute(new CreateDepartmentCommand(id, name));
    }

    async getDepartment(name: string): Promise<DepartmentView>{
        this.
    }
}