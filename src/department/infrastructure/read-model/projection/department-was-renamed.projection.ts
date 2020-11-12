import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";
import { DepartmentWasRenamed } from "src/department/domain/event";
import { Department } from "src/department/domain/model";
import { DepartmentView } from "../schema/department.schema";

@ViewUpdaterHandler(DepartmentWasRenamed)
export class DepartmentWasRenamedProjection implements IViewUpdater<DepartmentWasRenamed>{
    constructor(@Inject('DEPARTMENT_MODEL') private readonly departmentModel: Model<DepartmentView>){}

    async handle(event: DepartmentWasRenamed){
      
        await this.departmentModel.updateOne(
            {_id: event.id}, {name: event.name})
            .exec();
    
    }


}
