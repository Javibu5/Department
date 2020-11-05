import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CreateDepartmentCommand } from "src/department/application/command/create-department.command";

@Injectable()
export class DepartmentService {
    constructor(private commandBus: CommandBus){}

    async createDepartment(id : string, name : string): Promise<void> {
        this.commandBus.execute(new CreateDepartmentCommand(id, name));

        
    }
}