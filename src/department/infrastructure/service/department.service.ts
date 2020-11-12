import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Model } from "mongoose";
import { CreateDepartmentCommand } from "src/department/application/command/create-department.command";
import { DeleteDepartmentCommand } from "src/department/application/command/delete-department.command";
import { Department } from "src/department/domain/model";

import { DEPARTMENT_MODEL,DepartmentView } from "../read-model/schema/department.schema";

@Injectable()
export class DepartmentService {
    constructor(private commandBus: CommandBus,
                @Inject(DEPARTMENT_MODEL) private readonly departmentModel: Model<DepartmentView>){}

    async createDepartment(id : string, name : string): Promise<void> {
        return this.commandBus.execute(new CreateDepartmentCommand(id, name));
    }

    async getDepartment(id: string): Promise<DepartmentView>{
        return await this.departmentModel.findById(id).exec();
    }

    async getDepartments(): Promise<DepartmentView[]>{
        return await this.departmentModel.find().exec();
    }

    async deleteDepartment(id:string) : Promise<void>{
        return this.commandBus.execute(new DeleteDepartmentCommand(id))
    }
}