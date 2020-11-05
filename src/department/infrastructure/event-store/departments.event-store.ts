import { Injectable } from "@nestjs/common";
import { StoreEventPublisher } from "event-sourcing-nestjs";
import { DepartmentId, Department } from "src/department/domain/model";
import { Departments } from "src/department/domain/repository";


@Injectable()
export class DepartmentsEventStore implements Departments {
    
    constructor(private readonly publisher: StoreEventPublisher){}

    find(deparmentId: DepartmentId): Promise<Department> {
        throw new Error("Method not implemented.");
    }
    save(department: Department): void {
        department.commit();
    }

}