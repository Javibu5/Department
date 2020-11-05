import { Injectable } from "@nestjs/common";
import { EventStore, StoreEventPublisher } from "event-sourcing-nestjs";

import { Department } from "src/department/domain/model/department";
import { DepartmentId } from "../../domain/model/department-id"
import { Departments } from "../../domain/repository/departments"


@Injectable()
export class DepartmentEventStore implements Departments {
    constructor( 
        private readonly eventStore: EventStore,
        private readonly publisher: StoreEventPublisher,
    ){}

    async get(departmentId: DepartmentId): Promise<Department> {
        const department = Reflect.construct(Department, []);
        department.loadFromHistory(
            await this.eventStore.getEvents('department', departmentId.value),
        );

        return department;
    }

    async find(departmentId : DepartmentId): Promise<Department> | null {
        const events = await this.eventStore.getEvents('deparment', departmentId.value);

        if(events.length === 0){
            return null;
        }

        const department = Reflect.construct(Department, []);
        department.loadFromHistory(events);

        return department;
    }

    save(department : Department): void {
        department = this.publisher.mergeObjectContext(department);
        department.commit();
    }

    nextIdentity(): DepartmentId{
        return DepartmentId.generate();
    }
}