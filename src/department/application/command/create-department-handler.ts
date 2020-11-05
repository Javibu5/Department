import { Inject } from "@nestjs/common";

import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DepartmentAliasAlreadyRegisteredError } from "src/department/domain/exception/department-alias-already-registered.error";

import { DepartmentIdAlreadyRegisteredError } from "src/department/domain/exception/department-id-already-registered.error";
import { Department, DepartmentAlias, DepartmentId, DepartmentName } from "src/department/domain/model";
import { DEPARTMENTS, Departments } from "src/department/domain/repository";
import { CheckUniqueDepartmentAlias, CHECK_UNIQUE_DEPARTMENT_ALIAS } from "src/department/domain/services/check-unique-department-alias.service";
import { CreateDepartmentCommand } from "./create-deppartment.command";

@CommandHandler(CreateDepartmentCommand)
export class CreateDepartmentHandler implements ICommandHandler<CreateDepartmentCommand>{
    constructor(
        @Inject(DEPARTMENTS) private readonly departments: Departments,
        @Inject(CHECK_UNIQUE_DEPARTMENT_ALIAS)
        private readonly checkUniqueDepartmentAlias: CheckUniqueDepartmentAlias,
    ){}

        asyncexecute(command: CreateDepartmentCommand){
            const departmentId = DepartmentId.fromString(command.departmentId);
            const name= DepartmentName.fromString(command.name);
            const alias = DepartmentAlias.fromString(command.alias);

            if ((await this.departments.find(departmentId))instanceof Department) {
                throw DepartmentIdAlreadyRegisteredError.withString(command.departmentId);
            }

            if ((await this.checkUniqueDepartmentAlias.with(alias)) instanceof DepartmentId){
                throw DepartmentAliasAlreadyRegisteredError.withString(command.alias);
            }

            const department= Department.add ( departmentId, name, alias);

            this.departments.save(department);
        }
}