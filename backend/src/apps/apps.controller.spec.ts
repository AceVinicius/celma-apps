import { Test, TestingModule } from '@nestjs/testing';
import { AppsController } from './apps.controller';
import { App } from './entities/app.entity';
import { CreateAppDto } from './dto/create-app.dto';
import { AppsService } from './apps.service';
import { NotFoundException } from '@nestjs/common';
import { UpdateAppDto } from './dto/update-app.dto';

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

const activeApp: App = new App({
  id: '',
  name: 'app 1',
  description: 'o app 1 faz isto.',
  url: 'https://teste.com/teste',
  is_active: true,
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
});

const updatedActiveApp: App = new App({
  id: '',
  name: 'app 1 atualizado',
  description: 'o app 1 faz isto depois de atualizar.',
  url: 'https://teste.com/teste-atualizado',
  is_active: true,
  createdAt: '',
  updatedAt: 'a',
  deletedAt: null,
});

const inactiveApp: App = new App({
  id: '',
  name: 'app 1',
  description: 'o app 1 faz isto.',
  url: 'https://teste.com/teste',
  is_active: false,
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
});

const updatedInactiveApp: App = new App({
  id: '',
  name: 'app 1 atualizado',
  description: 'o app 1 faz isto depois de atualizar.',
  url: 'https://teste.com/teste-atualizado',
  is_active: false,
  createdAt: '',
  updatedAt: 'a',
  deletedAt: null,
});

describe('AppsController', () => {
  let appsController: AppsController;
  let appsService: AppsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppsController],
      providers: [
        {
          provide: AppsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    appsController = module.get<AppsController>(AppsController);
    appsService = module.get<AppsService>(AppsService);
  });

  it('should be defined', () => {
    expect(appsController).toBeDefined();
    expect(appsService).toBeDefined();
  });

  describe('create', () => {
    it('should create an active app successfully', async () => {
      // Arrange
      const input: CreateAppDto = {
        name: activeApp.name,
        description: activeApp.description,
        url: activeApp.url,
        is_active: activeApp.is_active,
      };

      jest.spyOn(appsService, 'create').mockResolvedValueOnce(activeApp);

      // Act
      const result = await appsController.create(input);

      // Assert
      expect(appsService.create).toHaveBeenCalledTimes(1);
      expect(appsService.create).toHaveBeenCalledWith(input);
      expect(result).toBeDefined();
      expect(result).toEqual(activeApp);
      expect(result.is_active).toBe<boolean>(true);
      expect(result.deletedAt).toBeNull();
    });

    it('should create an inactive app successfully', async () => {
      // Arrange
      const input: CreateAppDto = {
        name: inactiveApp.name,
        description: inactiveApp.description,
        url: inactiveApp.url,
        is_active: inactiveApp.is_active,
      };

      jest.spyOn(appsService, 'create').mockResolvedValueOnce(inactiveApp);

      // Act
      const result = await appsController.create(input);

      // Assert
      expect(appsService.create).toHaveBeenCalledTimes(1);
      expect(appsService.create).toHaveBeenCalledWith(input);
      expect(result).toBeDefined();
      expect(result).toEqual(inactiveApp);
      expect(result.is_active).toBe<boolean>(false);
      expect(result.deletedAt).toBeNull();
    });

    it('should throw an exception when any error occurs', () => {
      // Arrange
      const input: CreateAppDto = {
        name: activeApp.name,
        description: activeApp.description,
        url: activeApp.url,
        is_active: activeApp.is_active,
      };

      jest.spyOn(appsService, 'create').mockRejectedValueOnce(new Error());

      // Act
      const result = appsController.create(input);

      // Assert
      expect(result).rejects.toThrowError();
    });
  });

  describe('findAll', () => {
    it('should find all activated apps successfully', async () => {
      // Arrange
      jest.spyOn(appsService, 'findAll').mockResolvedValueOnce(appList);

      // Act
      const result = await appsController.findAll();

      // Assert
      expect(appsService.findAll).toHaveBeenCalledTimes(1);
      expect(appsService.findAll).toHaveBeenCalledWith();
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(Array);

      result.forEach((r, i) => {
        expect(r).toBeInstanceOf(App);
        expect(r).toEqual(appList[i]);
        expect(r.is_active).toBe<boolean>(true);
        expect(r.deletedAt).toBeNull();
      });
    });

    it('should throw an exception when any error occurs', () => {
      // Arrange
      jest.spyOn(appsService, 'findAll').mockRejectedValueOnce(new Error());

      // Act
      const result = appsController.findAll();

      // Assert
      expect(appsService.findAll).toHaveBeenCalledTimes(1);
      expect(appsService.findAll).toHaveBeenCalledWith();
      expect(result).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('should return an active App successfully', async () => {
      // Arrange
      const id: string = activeApp.id;

      jest.spyOn(appsService, 'findOne').mockResolvedValueOnce(activeApp);

      // Act
      const result = await appsController.findOne(id);

      // Assert
      expect(appsService.findOne).toHaveBeenCalledTimes(1);
      expect(appsService.findOne).toHaveBeenCalledWith(id);
      expect(result).toBeInstanceOf(App);
      expect(result).toEqual(activeApp);
      expect(result.is_active).toBe<boolean>(true);
      expect(result.deletedAt).toBeNull();
    });

    it('should return an inactive App successfully', async () => {
      // Arrange
      const id: string = inactiveApp.id;

      jest.spyOn(appsService, 'findOne').mockResolvedValueOnce(inactiveApp);

      // Act
      const result = await appsController.findOne(id);

      // Assert
      expect(appsService.findOne).toHaveBeenCalledTimes(1);
      expect(appsService.findOne).toHaveBeenCalledWith(id);
      expect(result).toBeInstanceOf(App);
      expect(result).toEqual(inactiveApp);
      expect(result.is_active).toBe<boolean>(false);
      expect(result.deletedAt).toBeNull();
    });

    it('should throw a not found exception when any error occurs', () => {
      // Arrange
      const id: string = activeApp.id;

      jest
        .spyOn(appsService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      // Act
      const result = appsController.findOne(id);

      // Assert
      expect(appsService.findOne).toHaveBeenCalledTimes(1);
      expect(appsService.findOne).toHaveBeenCalledWith(id);
      expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an active record', async () => {
      // Arrange
      const id: string = activeApp.id;
      const input: UpdateAppDto = {
        name: updatedActiveApp.name,
        description: updatedActiveApp.description,
        url: updatedActiveApp.url,
        is_active: updatedActiveApp.is_active,
      };

      jest.spyOn(appsService, 'update').mockResolvedValueOnce(updatedActiveApp);

      // Act
      const result = await appsController.update(id, input);

      // Assert
      expect(appsService.update).toHaveBeenCalledTimes(1);
      expect(appsService.update).toHaveBeenCalledWith(id, input);
      expect(result).toBeInstanceOf(App);
      expect(result).toEqual(updatedActiveApp);
      expect(result.is_active).toBe<boolean>(true);
      expect(result.updatedAt).not.toEqual(activeApp.updatedAt);
      expect(result.deletedAt).toBeNull();
    });

    it('should update an inactive record', async () => {
      // Arrange
      const id: string = activeApp.id;
      const input: UpdateAppDto = {
        name: updatedInactiveApp.name,
        description: updatedInactiveApp.description,
        url: updatedInactiveApp.url,
        is_active: updatedInactiveApp.is_active,
      };

      jest
        .spyOn(appsService, 'update')
        .mockResolvedValueOnce(updatedInactiveApp);

      // Act
      const result = await appsController.update(id, input);

      // Assert
      expect(appsService.update).toHaveBeenCalledTimes(1);
      expect(appsService.update).toHaveBeenCalledWith(id, input);
      expect(result).toBeInstanceOf(App);
      expect(result).toEqual(updatedInactiveApp);
      expect(result.is_active).toBe<boolean>(false);
      expect(result.updatedAt).not.toEqual(activeApp.updatedAt);
      expect(result.deletedAt).toBeNull();
    });

    it('should throw a not found exception when id does not exists', () => {
      // Arrange
      const id = '';
      const input: UpdateAppDto = {
        name: updatedActiveApp.name,
        description: updatedActiveApp.description,
        url: updatedActiveApp.url,
        is_active: updatedActiveApp.is_active,
      };

      jest
        .spyOn(appsService, 'update')
        .mockRejectedValueOnce(new NotFoundException());

      // Act
      const result = appsController.update(id, input);

      // Assert
      expect(appsService.update).toHaveBeenCalledTimes(1);
      expect(appsService.update).toHaveBeenCalledWith(id, input);
      expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should should delete an app', async () => {
      // Arrange
      const id = '';

      jest.spyOn(appsService, 'remove').mockResolvedValueOnce(undefined);

      // Act
      const result = await appsController.remove(id);

      // Assert
      expect(appsService.remove).toHaveBeenCalledTimes(1);
      expect(appsService.remove).toHaveBeenCalledWith(id);
      expect(result).toBeUndefined();
    });

    it('should throw a not found exception when id does not exists', () => {
      // Arrange
      const id = '';

      jest
        .spyOn(appsService, 'remove')
        .mockRejectedValueOnce(new NotFoundException());

      // Act
      const result = appsController.remove(id);

      // Assert
      expect(appsService.remove).toHaveBeenCalledTimes(1);
      expect(appsService.remove).toHaveBeenCalledWith(id);
      expect(result).rejects.toThrowError(NotFoundException);
    });

    it('should throw an exception when error while deleting', () => {
      // Arrange
      const id = '';

      jest.spyOn(appsService, 'remove').mockRejectedValueOnce(new Error());

      // Act
      const result = appsController.remove(id);

      // Assert
      expect(appsService.remove).toHaveBeenCalledTimes(1);
      expect(appsService.remove).toHaveBeenCalledWith(id);
      expect(result).rejects.toThrowError();
    });
  });
});
