import { AggregateRoot } from "@nestjs/cqrs";
import { DepartmentWasCreated, DepartmentWasRemoved, DepartmentWasRenamed } from "../event";
import { DepartmentId } from "./department-id";
import { DepartmentName } from "./department-name";

export class Department extends AggregateRoot{
    private _departmentId: DepartmentId;
    private _name: DepartmentName;
    private _isRemoved: boolean;
    
private constructor(){
    super();
}

public static add(
    departmentId: DepartmentId,
    name: DepartmentName,
): Department {
    const department = new Department();

    department.apply(new DepartmentWasCreated(departmentId.value, name.value));

    return department;
}

public aggregateId() : string {
    return this._departmentId.value;
}

get id(): DepartmentId{
    return this._departmentId;
}

get name(): DepartmentName{
    return this._name;
}


get isRemoved(): boolean{
    return this._isRemoved;
}

rename( name: DepartmentName){
    if(name.equals(this._name)){
        return;
    }

    this.apply(new DepartmentWasRenamed(this._departmentId.value, name.value))
}

private onDepartmentWasCreated(event: DepartmentWasCreated) {
    this._departmentId = DepartmentId.fromString(event.id);
    this._name = DepartmentName.fromString(event.name);
    this._isRemoved = false;
  }

  private onDepartmentWasRenamed(event: DepartmentWasRenamed) {
    this._name = DepartmentName.fromString(event.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private onDepartmentWasRemoved(event: DepartmentWasRemoved) {
    this._isRemoved = true;
  }
}

