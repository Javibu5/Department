import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";
import { DepartmentWasCreated } from "src/department/domain/event";
import { DepartmentView } from "../schema/department.schema";

@ViewUpdaterHandler(DepartmentWasCreated)
export class DepartmentWasCreatedProjection implements IViewUpdater<DepartmentWasCreated> {
    constructor(
        @Inject('DEPARTMENT_MODEL') private readonly departmentModel: Model<DepartmentView>
    ){}

    async handle(event: DepartmentWasCreated){
        const DepartmentView = new this.departmentModel({
            _id: event.id,
            name: event.name,
        });

        await DepartmentView.save();
    }
}