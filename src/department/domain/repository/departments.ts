import { Department, DepartmentId} from '../model';

export interface Departments {
    find( deparmentId: DepartmentId): Promise<Department> | null;
    get(deparmentId: DepartmentId): Promise<Department>;
    nextIdentity(): DepartmentId;
    save(department: Department): void;
}

