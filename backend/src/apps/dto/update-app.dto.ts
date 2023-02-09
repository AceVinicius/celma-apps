import { PartialType } from '@nestjs/mapped-types';
import { CreateAppDto } from './create-app.dto';
import { IsAscii, IsBoolean, IsOptional, IsUrl } from 'class-validator';

export class UpdateAppDto extends PartialType(CreateAppDto) {
  @IsOptional()
  @IsAscii()
  name: string;

  @IsOptional()
  @IsAscii()
  description: string;

  @IsOptional()
  @IsUrl()
  url: string;

  @IsOptional()
  @IsBoolean()
  is_active: boolean;
}
