import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/courses.entity';
import { DataSourceOptions } from 'typeorm';


export const dataSourceOptions:DataSourceOptions = {
    type:'postgres',
    host :'localhostos',
    port: 5432,
    username: 'postgres',
    database: 'devtrainig',
    entities:[Course],
    synchronize: true,

}
@Module({
    imports:[TypeOrmModule.forRootAsync({useFactory:async ()=>{
        return{
            ...dataSourceOptions
        }
    }})]
})
export class DatabaseModule {}
