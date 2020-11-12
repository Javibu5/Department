import { Injectable } from "@nestjs/common";
import { EventStore, StoreEventPublisher } from "event-sourcing-nestjs";
import { Department,DepartmentId } from "src/department/domain/model";
import { Departments } from "src/department/domain/repository";


@Injectable()
export class DepartmentsEventStore implements Departments {
    
    constructor(private readonly publisher: StoreEventPublisher,
                private readonly events: EventStore,
                ){}

    async find(departmentId: DepartmentId): Promise<Department> | null {
        const events = await this.events.getEvents('department', departmentId.value);

        if (events.length === 0){
            return null;
        }

        const department = Reflect.construct(Department, []);
        department.loadFromHistory(events);

        return department;
    }
    save(department: Department): void {
        department = this.publisher.mergeObjectContext(department)
        department.commit();

    }

}