import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Department, DepartmentId, DepartmentName } from "src/department/domain/model";
import { DEPARTMENTS, Departments } from "src/department/domain/repository";
import { RenameDepartmentCommand } from "./rename-department.command";


@CommandHandler(RenameDepartmentCommand)
export class RenameDepartmentHandler implements ICommandHandler<RenameDepartmentCommand>{
    constructor(@Inject(DEPARTMENTS)readonly departments: Departments){}
    
                async execute(command: RenameDepartmentCommand): Promise<void> {
                    const departmentId = DepartmentId.fromString(command.id);
                    const department = await this.departments.find(departmentId);

                    const newDepartmentName = DepartmentName.fromString(command.name);

                    department.rename(newDepartmentName);
                    this.departments.save(department);
                    
                }
}