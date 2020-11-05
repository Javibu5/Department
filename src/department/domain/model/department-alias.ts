import { ValueObject } from '../../../common/domain/models/value-object';

interface Props {
  value: string;
}

export class DepartmentAlias extends ValueObject<Props> {
  public static fromString(alias: string): DepartmentAlias {
    if (!/^[a-z][a-z0-9\-]*$/.test(alias)) {
      throw new Error('Invalid alias');
    }

    return new DepartmentAlias({ value: alias });
  }

  get value(): string {
    return this.props.value;
  }
}