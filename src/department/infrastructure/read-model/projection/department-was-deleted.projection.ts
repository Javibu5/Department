import { Inject } from "@nestjs/common";
import { IViewUpdater, ViewUpdaterHandler } from "event-sourcing-nestjs";
import { Model } from "mongoose";
import { DepartmentWasDeleted } from "src/department/domain/event";
import { DepartmentView, DEPARTMENT_MODEL } from "../schema/department.schema";

@ViewUpdaterHandler(DepartmentWasDeleted)
export class DepartmentWasDeletedProjection implements IViewUpdater<DepartmentWasDeleted>{
    constructor(
        @Inject(DEPARTMENT_MODEL) private readonly departmentModel: Model<DepartmentView>,
    ){}

    async handle (event: DepartmentWasDeleted) {
        const departmentView = await this.departmentModel.findById(event.id).exec();

        await departmentView.remove();
    }
}