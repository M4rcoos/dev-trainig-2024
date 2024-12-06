import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

@Injectable()
export class CoursesService {
    private courses:Course[]=[
        {
            id:1,
            name:'NestJs',
            description:'Curso sobre fundamentos do Nestjs',
            tags:['Node.js', 'Nestjs', 'Javascript', 'typescript'],
        },
        {
            id:1,
            name:'NestJs',
            description:'Curso sobre fundamentos do Nestjs',
            tags:['Node.js', 'Nestjs', 'Javascript', 'typescript'],
        }
    ]
    findAll(){
        return this.courses
    }
    findOne(id:number){
        const course = this.courses.find(course => course.id === id)
        if(!course){
            throw new HttpException(`course ID ${id} not found`, HttpStatus.NOT_FOUND)

        }
        return course

    }
    create(createCourseDTO:any){
        this.courses.push(createCourseDTO)
    }
    update(id:number, updateCurseDTO:any){
        const existingCourse = this.findOne(id)
        if(existingCourse as any){
            const index = this.courses.findIndex(course=>course.id === id)
            this.courses[index] = {
                id,
                ...updateCurseDTO
            }
        }
        return updateCurseDTO
    }
    remove(id:number){
        const index = this.courses.findIndex(course=>course.id === id)
        if(index >= 0){
            this.courses.splice(index,1)
        }
    }
}
