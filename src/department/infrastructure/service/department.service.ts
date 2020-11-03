import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import {Model} from 'mongoose';
import { CreateDepartmentCommand } from "src/department/application/command/create-deppartment.command";

import {DEPARTMENT_MODEL , DepartmentView} from '../schema/department.schema'



@Injectable()
export class DepartmentService{
    constructor(
        private readonly commandBus : CommandBus,
        @Inject(DEPARTMENT_MODEL) private readonly departmentModel: Model<DepartmentView>,
    ){}


    async createDepartment(id: string, name:string, alias:string){
        return this.commandBus.execute(new CreateDepartmentCommand(id, name, alias));
    }

    async renameDepartment(id: string, name : string){
        return this.commandBus.execute(new RenameScopeCommand(id, name));
    }

    async removeDepartment(id: string){
        return this.commandBus.execute(new RemoveScopeCommand(id));
    }

    async getDepartment(id: string): Promise<DepartmentView> {
        return await this.departmentModel.findById(id).exec();
    }

    async getDepartments():Promise<DepartmentView[]> {
        retrun this.departmentModel.find().exec();
        }
    
   


}