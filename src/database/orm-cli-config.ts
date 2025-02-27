import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateCursesTables1740656058445 } from 'src/migrations/1740656058445-CreateCursesTables';
import { CreateTagsTables1740657909146 } from 'src/migrations/1740657909146-CreateTagsTables';

export const dataSouce = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateCursesTables1740656058445, CreateTagsTables1740657909146],
});
