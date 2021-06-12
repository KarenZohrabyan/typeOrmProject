import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions";

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '11111',
  database: 'pharmacy',
  entities: ["dist/**/*.entity{.ts,.js}"],
  synchronize: false,
  migrationsTableName: 'gagoi_mot',
  migrations: [
      'dist/db/migrations/**/*{.js,.ts}',
  ],
  cli: {
      migrationsDir: 'src/migrations',
      entitiesDir: "src/db/entity",
      subscribersDir: "src/sbscriber"
  },
  subscribers: [
      'dist/db/subsctiber/**/*{.js,.ts}'
  ]
}

export default typeOrmConfig;