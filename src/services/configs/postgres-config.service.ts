import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '11111',
  database: 'pharmacy',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: true
}