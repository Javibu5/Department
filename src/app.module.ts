import { DynamicModule } from '@nestjs/common';

import { BootstrapModule } from './bootstrap.module';
import { DepartmentModule } from './department/infrastructure/department.module'

export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [BootstrapModule , DepartmentModule],
    };
  }
}
