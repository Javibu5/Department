import {ICommand} from '@nestjs/cqrs'

export class CreateDepartmentCommand implements ICommand {
    constructor(
        public readonly departmentId: string,
        public readonly name: string,
        public readonly alias: string,
    ){}
}