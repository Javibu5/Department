import { StorableEvent } from "event-sourcing-nestjs";


export class DepartmentWasCreated extends StorableEvent{

    eventAggregate = 'department';
    eventVersion = 1;

    constructor( 
        public readonly id: string,
        public readonly name: string,
        ){
            super();
        }
}