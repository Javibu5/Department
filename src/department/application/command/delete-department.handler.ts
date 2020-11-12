import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Department, DepartmentId } from "src/department/domain/model";
import { DEPARTMENTS, Departments } from "src/department/domain/repository";

import {DeleteDepartmentCommand} from './delete-department.command';

@CommandHandler(DeleteDepartmentCommand)
export class DeleteDepartmentHandler implements ICommandHandler{
constructor(
   @Inject(DEPARTMENTS) private readonly departments : Departments,
){}

async execute (command: DeleteDepartmentCommand){
    const departmentId = DepartmentId.fromString(command.id);
    const department = await this.departments.find(departmentId);

    if(!(department instanceof Department) || department.isRemoved){
        throw new Error();
    }

    department.remove();
    this.departments.save(department);
}

}