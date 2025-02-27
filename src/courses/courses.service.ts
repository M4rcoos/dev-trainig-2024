import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from '../courses/entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly curseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return this.curseRepository.find({ relations: ['tags'] });
  }

  async findOne(id: number) {
    const course = await this.curseRepository.find({
      where: { id },
      relations: ['tags'],
    });
    if (!course) {
      throw new HttpException(
        `course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );

    const course = this.curseRepository.create({ ...createCourseDTO, tags });
    return await this.curseRepository.save(course);
  }

  async update(id: number, updateCurseDTO: UpdateCourseDTO) {
    const tags =
      updateCurseDTO.tags &&
      (await Promise.all(
        updateCurseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));
    const courses = await this.curseRepository.preload({
      ...updateCurseDTO,
      id,
      tags,
    });
    if (!courses) {
      throw new HttpException(
        `course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.curseRepository.save(courses);
  }

  async remove(id: number) {
    const courses = await this.curseRepository.findOne({ where: { id } });
    if (!courses) {
      throw new HttpException(
        `course ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return this.curseRepository.remove(courses);
  }
  private async preloadTagByName(name: string): Promise<Tag> {
    let tag = await this.tagRepository.findOne({ where: { name } });
    if (!tag) {
      tag = await this.tagRepository.create({ name });
    }
    return tag;
  }
}
