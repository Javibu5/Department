import { Department, DepartmentId} from '../model';

export interface Departments {
    find( deparmentId: DepartmentId): Promise<Department> | null;
    save(department: Department): void;
}

