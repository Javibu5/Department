import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Department, DepartmentId, DepartmentName } from "src/department/domain/model";
import { CreateDepartmentCommand } from "./create-department.command";

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentHandler implements ICommandHandler<CreateDepartmentCommand>{

    async execute(command: CreateDepartmentCommand): Promise<void> {
        const department = Department.add(DepartmentId.fromString(command.id), DepartmentName.fromString(command.name));
        
    }

}