import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { App } from './entities/app.entity';

const appList: App[] = [
  new App({
    id: '',
    name: 'app 1',
    description: 'o app 1 faz isto.',
    url: 'https://teste.com/teste-1',
    is_active: true,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  }),
  new App({
    id: '',
    name: 'app 2',
    description: 'o app 2 faz isto.',
    url: 'https://teste.com/teste-2',
    is_active: true,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  }),
  new App({
    id: '',
    name: 'app 3',
    description: 'o app 3 faz isto.',
    url: 'https://teste.com/teste-3',
    is_active: true,
    createdAt: '',
    updatedAt: '',
    deletedAt: null,
  }),
];

const updatedApp: App = new App({
  id: '',
  name: 'app 1 atualizado',
  description: 'o app 1 faz isto depois de atualizar.',
  url: 'https://teste.com/teste-atualizado',
  is_active: true,
  createdAt: '',
  updatedAt: 'a',
  deletedAt: null,
});

describe('AppsService', () => {
  let appsService: AppsService;
  let appRepository: Repository<App>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppsService,
        {
          provide: getRepositoryToken(App),
          useValue: {
            findOneByOrFail: jest.fn(),
            softDelete: jest.fn(),
            create: jest.fn(),
            merge: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    appsService = module.get<AppsService>(AppsService);
    appRepository = module.get<Repository<App>>(getRepositoryToken(App));
  });

  it('should be defined', () => {
    expect(appsService).toBeDefined();
    expect(appRepository).toBeDefined();
  });

  describe('create', () => {
    it('should create a new app successfully', async () => {
      // Arrange
      const app = appList[0];
      const input: CreateAppDto = {
        name: app.name,
        description: app.description,
        url: app.url,
        is_active: app.is_active,
      };

      jest.spyOn(appRepository, 'create').mockReturnValueOnce(app);
      jest.spyOn(appRepository, 'save').mockResolvedValueOnce(app);

      // Act
      const result = await appsService.create(input);

      // Assert
      expect(appRepository.create).toHaveBeenCalledTimes(1);
      expect(appRepository.create).toHaveBeenCalledWith(input);
      expect(appRepository.save).toHaveBeenCalledTimes(1);
      expect(appRepository.save).toHaveBeenCalledWith(app);
      expect(result).toBeInstanceOf(App);
      expect(result).toEqual(app);
    });

    it('should throw an exception when appRepository fails', () => {
      // Arrange
      const app = appList[0];
      const input: CreateAppDto = {
        name: app.name,
        description: app.description,
        url: app.url,
        is_active: app.is_active,
      };

      jest.spyOn(appRepository, 'create').mockReturnValueOnce(app);
      jest.spyOn(appRepository, 'save').mockRejectedValueOnce(new Error());

      // Act
      const result = appsService.create(input);

      // Assert
      expect(appRepository.create).toHaveBeenCalledTimes(1);
      expect(appRepository.create).toHaveBeenCalledWith(input);
      expect(appRepository.save).toHaveBeenCalledTimes(1);
      expect(appRepository.save).toHaveBeenCalledWith(app);
      expect(result).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should return an app list entity successfully', async () => {
      // Arrange
      jest.spyOn(appRepository, 'find').mockResolvedValueOnce(appList);

      // Act
      const result = await appsService.findAll();

      // Assert
      expect(appRepository.find).toHaveBeenCalledTimes(1);
      expect(appRepository.find).toHaveBeenCalledWith();
      expect(result).toBeInstanceOf(Array);
      expect(result).toEqual(appList);
    });

    it('should throw an exception when appsService fails', () => {
      // Arrange
      jest.spyOn(appRepository, 'find').mockRejectedValueOnce(new Error());

      // Act
      const result = appsService.findAll();

      // Assert
      expect(appRepository.find).toHaveBeenCalledTimes(1);
      expect(appRepository.find).toHaveBeenCalledWith();
      expect(result).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return a single app entity successfully', async () => {
      // Arrange
      const app = appList[0];
      const id = app.id;
      const parameter = { id: id };

      jest.spyOn(appRepository, 'findOneByOrFail').mockResolvedValueOnce(app);

      // Act
      const result = await appsService.findOne(id);

      // Assert
      expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
      expect(result).toBeInstanceOf(App);
      expect(result).toEqual(app);
    });

    it('should throw a not found exception when appRepository fails', () => {
      // Arrange
      const app = appList[0];
      const id = app.id;
      const parameter = { id: id };

      jest
        .spyOn(appRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Act
      const result = appsService.findOne(id);

      // Assert
      expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
      expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should return an updated entity', async () => {
      // Arrange
      const app = appList[0];
      const id: string = app.id;
      const parameter = { id: id };
      const input: UpdateAppDto = {
        name: updatedApp.name,
        description: updatedApp.description,
        url: updatedApp.url,
        is_active: updatedApp.is_active,
      };

      jest.spyOn(appRepository, 'findOneByOrFail').mockResolvedValueOnce(app);
      jest.spyOn(appRepository, 'merge').mockReturnValueOnce(updatedApp);
      jest.spyOn(appRepository, 'save').mockResolvedValueOnce(updatedApp);

      // Act
      const result = await appsService.update(id, input);

      // Assert
      expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
      expect(appRepository.merge).toHaveBeenCalledTimes(1);
      expect(appRepository.merge).toHaveBeenCalledWith(app, input);
      expect(appRepository.save).toHaveBeenCalledTimes(1);
      // expect(appRepository.save).toHaveBeenCalledWith(updatedApp);
      expect(result).toEqual(updatedApp);
    });

    it('should return a not found exception when id is not valid', () => {
      // Arrange
      const app = appList[0];
      const id: string = app.id;
      const parameter = { id: id };
      const input: UpdateAppDto = {
        name: updatedApp.name,
        description: updatedApp.description,
        url: updatedApp.url,
        is_active: updatedApp.is_active,
      };

      jest
        .spyOn(appRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Act
      const result = appsService.update(id, input);

      // Assert
      expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
      expect(appRepository.merge).toHaveBeenCalledTimes(0);
      expect(appRepository.save).toHaveBeenCalledTimes(0);
      expect(result).rejects.toThrowError(NotFoundException);
    });

    // it('should return an exception when save fails', () => {
    //   // Arrange
    //   const app = appList[0];
    //   const id: string = app.id;
    //   const parameter = { id: id };
    //   const input: UpdateAppDto = {
    //     name: updatedApp.name,
    //     description: updatedApp.description,
    //     url: updatedApp.url,
    //     is_active: updatedApp.is_active,
    //   };

    //   jest.spyOn(appRepository, 'findOneByOrFail').mockResolvedValueOnce(app);
    //   jest.spyOn(appRepository, 'merge').mockReturnValueOnce(updatedApp);
    //   jest.spyOn(appRepository, 'save').mockRejectedValue(new Error());

    //   // Act
    //   const result = appsService.update(id, input);

    //   // Assert
    //   expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    //   expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
    //   expect(appRepository.merge).toHaveBeenCalledTimes(1);
    //   expect(appRepository.merge).toHaveBeenCalledWith(app, input);
    //   expect(appRepository.save).toHaveBeenCalledTimes(1);
    //   // expect(appRepository.save).toHaveBeenCalledWith(updatedApp);
    //   expect(result).rejects.toThrowError();
    // });
  });

  describe('remove', () => {
    it('should delete an app successfully', async () => {
      // Arrange
      const app: App = appList[0];
      const id: string = app.id;
      const parameter = { id: id };

      jest.spyOn(appRepository, 'findOneByOrFail').mockResolvedValueOnce(app);
      jest.spyOn(appRepository, 'softDelete').mockResolvedValueOnce(undefined);

      // Act
      const result = await appsService.remove(id);

      // Assert
      expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
      expect(appRepository.softDelete).toHaveBeenCalledTimes(1);
      expect(appRepository.softDelete).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });

    it('should throw a not found exception when id does not exist', () => {
      // Arrange
      const app: App = appList[0];
      const id: string = app.id;
      const parameter = { id: id };

      jest
        .spyOn(appRepository, 'findOneByOrFail')
        .mockRejectedValueOnce(new Error());

      // Act
      const result = appsService.remove(id);

      // Assert
      expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
      expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
      expect(appRepository.softDelete).toHaveBeenCalledTimes(0);
      expect(result).rejects.toThrowError(NotFoundException);
    });

    // it('should throw aN exception when softDelete fails', async () => {
    //   // Arrange
    //   const app: App = appList[0];
    //   const id: string = app.id;
    //   const parameter = { id: id };

    //   jest.spyOn(appRepository, 'findOneByOrFail').mockResolvedValueOnce(app);
    //   jest
    //     .spyOn(appRepository, 'softDelete')
    //     .mockRejectedValueOnce(new Error());

    //   // Act
    //   const result = await appsService.remove(id);

    //   // Assert
    //   expect(appRepository.findOneByOrFail).toHaveBeenCalledTimes(1);
    //   expect(appRepository.findOneByOrFail).toHaveBeenCalledWith(parameter);
    //   expect(appRepository.softDelete).toHaveBeenCalledTimes(1);
    //   expect(appRepository.softDelete).toHaveBeenCalledWith(id);
    //   expect(result).rejects.toThrowError();
    // });
  });
});
