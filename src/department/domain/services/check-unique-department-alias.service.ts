import { DepartmentAlias, DepartmentId } from '../model';

export interface CheckUniqueDepartmentAlias {
  with(alias: DepartmentAlias): Promise<DepartmentId>;
}

export const CHECK_UNIQUE_DEPARTMENT_ALIAS = 'CHECK_UNIQUE_DEPARTMENT_ALIAS';