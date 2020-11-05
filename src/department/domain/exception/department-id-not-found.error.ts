export class DepartmentIdNotFoundError extends Error {
    public static withString(departmentId: string): DepartmentIdNotFoundError {
      return new DepartmentIdNotFoundError(`DepartmentId ${departmentId} not found.`);
    }
  }