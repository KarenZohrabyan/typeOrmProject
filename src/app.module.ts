import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
// import { DatabaseModule } from './services/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './services/configs/postgres-config.service';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TaskModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    ConfigModule.forRoot(
      {envFilePath: '.env'}
    ),
  ]
})
export class AppModule {}
