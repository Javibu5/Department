
import { DynamicModule } from '@nestjs/common';

import {AppController} from './app.controller';
import { AuthModule } from './auth/auth.module';
import { BootstrapModule } from './bootstrap.module';
import { DepartmentModule } from './department/infrastructure/department.module'
import { UsersModule } from './users/users.module';

export class AppModule {
  static forRoot(): DynamicModule {
    return {
      module: this,
      imports: [BootstrapModule , DepartmentModule, AuthModule, UsersModule],
      controllers: [AppController],
    };
  }
}
