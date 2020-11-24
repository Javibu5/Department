
import { Inject} from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Department, DepartmentId, DepartmentName } from "src/department/domain/model";
import { DEPARTMENTS, Departments } from "src/department/domain/repository";

import { CreateDepartmentCommand } from "./create-department.command";

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentHandler implements ICommandHandler<CreateDepartmentCommand>{

    constructor(@Inject(DEPARTMENTS) private readonly departments: Departments){}

    async execute(command: CreateDepartmentCommand): Promise<Department> {
        const department = Department.add(DepartmentId.fromString(command.id), DepartmentName.fromString(command.name));
        this.departments.save(department);

        return department;
    }
}