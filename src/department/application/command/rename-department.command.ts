import { ICommand } from "@nestjs/cqrs";

export class RenameDepartmentCommand implements ICommand {
    constructor( public readonly id: string, 
                 public readonly name: string,){}
}