import { CreateDepartmentHandler } from "./create-department.handler";
import { DeleteDepartmentHandler } from "./delete-department.handler";
import { RenameDepartmentHandler } from "./rename-department.handler";


export const CommandHandlers = [
    CreateDepartmentHandler,
    DeleteDepartmentHandler,
    RenameDepartmentHandler,
];

export * from './create-department.command'
export * from './delete-department.command'
export * from './rename-department.command'