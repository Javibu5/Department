import { ICommand } from "@nestjs/cqrs";

export class DeleteDepartmentCommand implements ICommand {
    constructor(public readonly id: string){}
}