import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { UpdateAppDto } from './dto/update-app.dto';

@Controller('v1/apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @Post()
  async create(@Body() createAppDto: CreateAppDto) {
    return await this.appsService.create(createAppDto);
  }

  @Get()
  async findAll() {
    return await this.appsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.appsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAppDto: UpdateAppDto,
  ) {
    return await this.appsService.update(id, updateAppDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.appsService.remove(id);
  }
}
