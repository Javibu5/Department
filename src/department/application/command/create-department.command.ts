import { ICommand } from "@nestjs/cqrs";

export class CreateDepartmentCommand implements ICommand{
    constructor(public readonly id : string ,  public readonly name : string){}
}