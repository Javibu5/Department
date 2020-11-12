import { ValueObject } from '../../../common/domain/models/value-object';

interface Props {
    value: string;
}

export class DepartmentName extends ValueObject<Props> {
    public static fromString(name: string): DepartmentName {
        if (name.length === 0) {
            throw new Error('Invalid name');
        }
        return new DepartmentName({ value: name });
    }

    get value(): string {
        return this.props.value;
    }
}