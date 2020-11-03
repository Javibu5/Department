import { Injectable } from "@nestjs/common";
import { EventStore, StoreEventPublisher } from "event-sourcing-nestjs";

@Injectable()
export class DepartmentEventStore implements Department{
    constructor( 
        private readonly eventStore: EventStore,
        private readonly publisher: StoreEventPublisher,
    ){}

    async get(scopeId: ScopeId): Promise<Scope> {
        const scope = Reflect.construct(Scope, []);
        
    }
}