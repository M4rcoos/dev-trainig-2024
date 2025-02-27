import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { CreateCursesTables1740656058445 } from 'src/migrations/1740656058445-CreateCursesTables';
import { CreateTagsTables1740657909146 } from 'src/migrations/1740657909146-CreateTagsTables';
import { CreateCoursesTagsTables1740659498409 } from 'src/migrations/1740659498409-CreateCoursesTagsTables';
import { AddCoursesIdToCursesTagsTables1740659854032 } from 'src/migrations/1740659854032-AddCoursesIdToCursesTagsTables';
import { AddTagsIdToCursesTagsTables1740664068145 } from 'src/migrations/1740664068145-AddTagsIdToCursesTagsTables';
import { Course } from 'src/courses/entities/courses.entity';
import { Tag } from 'src/courses/entities/tags.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  schema: 'public',
  entities: [Course, Tag],
  synchronize: false,
};

export const dataSouce = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCursesTables1740656058445,
    CreateTagsTables1740657909146,
    CreateCoursesTagsTables1740659498409,
    AddCoursesIdToCursesTagsTables1740659854032,
    AddTagsIdToCursesTagsTables1740664068145,
  ],
});
