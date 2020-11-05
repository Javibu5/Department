export class DepartmentIdAlreadyRegisteredError extends Error {
    public static withString(departmentId: string): DepartmentIdAlreadyRegisteredError {
      return new DepartmentIdAlreadyRegisteredError(
        `DepartmentId ${departmentId} already taken.`,
      );
    }
  }