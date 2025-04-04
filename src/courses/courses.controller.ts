import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findUnique(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }
  @Post()
  create(@Body() body: CreateCourseDTO) {
    return this.courseService.create(body);
  }
  @HttpCode(200)
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateCourseDTO) {
    console.log('🚀 ~ CoursesController ~ update ~ id:', id, body);
    return this.courseService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
