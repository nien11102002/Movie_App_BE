import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  account: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsEmail({}, { message: `Email is not validation` })
  email: string;

  @ApiProperty()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsString()
  user_type: string;

  @ApiProperty()
  @IsString()
  phone_number: string;
}
