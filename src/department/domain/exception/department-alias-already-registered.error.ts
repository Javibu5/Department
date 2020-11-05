export class DepartmentAliasAlreadyRegisteredError extends Error {
    public static withString(
      departmentAlias: string,
    ): DepartmentAliasAlreadyRegisteredError {
      return new DepartmentAliasAlreadyRegisteredError(
        `ScopeAlias ${departmentAlias} already taken.`,
      );
    }
  }