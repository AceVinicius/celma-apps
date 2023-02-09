import {
  IsAscii,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsUrl,
} from 'class-validator';

export class CreateAppDto {
  @IsNotEmpty()
  @IsAscii()
  name: string;

  @IsOptional()
  @IsAscii()
  description: string;

  @IsNotEmpty()
  @IsUrl()
  url: string;

  @IsNotEmpty()
  @IsBoolean()
  is_active: boolean;
}
