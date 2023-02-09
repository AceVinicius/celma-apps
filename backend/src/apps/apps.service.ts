import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';
import { App } from './entities/app.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AppsService {
  constructor(
    @InjectRepository(App)
    private readonly appRepository: Repository<App>,
  ) {}

  async create(createAppDto: CreateAppDto) {
    const app = this.appRepository.create(createAppDto);

    return await this.appRepository.save(app);
  }

  async findAll() {
    return await this.appRepository.find({ where: { is_active: true } });
  }

  async findOne(id: string) {
    try {
      return await this.appRepository.findOneByOrFail({ id: id });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async update(id: string, updateAppDto: UpdateAppDto) {
    const app = await this.findOne(id);
    this.appRepository.merge(app, updateAppDto);
    return await this.appRepository.save(app);
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.appRepository.softDelete(id);
  }
}
