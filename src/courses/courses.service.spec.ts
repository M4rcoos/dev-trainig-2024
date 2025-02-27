import { Test, TestingModule } from '@nestjs/testing';
import { CoursesService } from './courses.service';
import { randomUUID } from 'node:crypto';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

describe('CoursesService unit tests', () => {
  let service: CoursesService;
  let id: string;
  let created_at: Date;
  let expectOutputTags: any;
  let expectOutPutCourses: any;
  let mockCourseRepository: any;
  let mockTagRepository: any;

  //responsavel por rodar código antes do teste
  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutputTags = [
      {
        id,
        name: 'nest js',
        created_at,
      },
    ];
    // RESPOSTA DA API
    expectOutPutCourses = {
      id,
      name: 'test',
      description: 'teste description',
      created_at,
      tags: expectOutputTags,
    };
    //criando função mock - oque eu espero que o metodo retorne?
    mockCourseRepository = {
      //ele irá retornar oque é passado dentro do mockReturnValue
      //ou seja uma promisse e o objeto "expectOutPutCourses"

      //metodo retorna o objeto mock
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutPutCourses)),
    };
    mockTagRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a course', async () => {
    //@ts-expect-error defined part of methods
    service['curseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    //AQUI EU CRIO OS DADOS PARA SEREM ENVIADOS!
    const createCourseDTO: CreateCourseDTO = {
      name: 'java script',
      description: 'node js',
      tags: ['JS', 'TS'],
    };

    //chamando o metodo de criar curso
    const newCourse = await service.create(createCourseDTO);

    //espero que o metodo tenha sido chamado
    expect(mockCourseRepository.save).toHaveBeenCalled();
    //espero que o objeto seja retornado seja igual ao newCourse
    expect(expectOutPutCourses).toStrictEqual(newCourse);
  });
  it('should list all course', async () => {
    //@ts-expect-error defined part of methods
    service['curseRepository'] = mockCourseRepository;

    const courses = await service.findAll();

    //espero que o metodo tenha sido chamado
    expect(mockCourseRepository.find).toHaveBeenCalled();
    //espero que o objeto seja retornado seja igual ao newCourse
    expect(expectOutPutCourses).toStrictEqual(courses);
  });

  it('should get a course by id', async () => {
    //@ts-expect-error defined part of methods
    service['curseRepository'] = mockCourseRepository;

    const courses = await service.findOne(id);

    //espero que o metodo tenha sido chamado
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    //espero que o objeto seja retornado seja igual ao newCourse
    expect(expectOutPutCourses).toStrictEqual(courses);
  });

  it('should update a course', async () => {
    //@ts-expect-error defined part of methods
    service['curseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    //AQUI EU CRIO OS DADOS PARA SEREM ENVIADOS!
    const updateCourseDTO: UpdateCourseDTO = {
      name: 'java script',
      description: 'node js',
      tags: ['JS', 'TS'],
    };

    const course = await service.update(id, updateCourseDTO);

    //espero que o metodo tenha sido chamado
    expect(mockCourseRepository.save).toHaveBeenCalled();
    //espero que o objeto seja retornado seja igual ao newCourse
    expect(expectOutPutCourses).toStrictEqual(course);
  });

  it('should update a course', async () => {
    //@ts-expect-error defined part of methods
    service['curseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    //AQUI EU CRIO OS DADOS PARA SEREM ENVIADOS!
    const updateCourseDTO: UpdateCourseDTO = {
      name: 'java script',
      description: 'node js',
      tags: ['JS', 'TS'],
    };

    const course = await service.update(id, updateCourseDTO);

    //espero que o metodo tenha sido chamado
    expect(mockCourseRepository.save).toHaveBeenCalled();
    expect(mockCourseRepository.preload).toHaveBeenCalled();
    //espero que o objeto seja retornado seja igual ao newCourse
    expect(expectOutPutCourses).toStrictEqual(course);
  });

  it('should remove a course', async () => {
    //@ts-expect-error defined part of methods
    service['curseRepository'] = mockCourseRepository;
    //@ts-expect-error defined part of methods
    service['tagRepository'] = mockTagRepository;

    const course = await service.remove(id);

    //espero que o metodo tenha sido chamado
    expect(mockCourseRepository.findOne).toHaveBeenCalled();
    expect(mockCourseRepository.remove).toHaveBeenCalled();
    //espero que o objeto seja retornado seja igual ao newCourse
    expect(expectOutPutCourses).toStrictEqual(course);
  });
});
