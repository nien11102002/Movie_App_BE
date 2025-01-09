import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber } from 'class-validator';

export class AddUserDto {
  @ApiProperty()
  account: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  full_name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  phone_number?: string;

  @ApiProperty({ description: '1 is Admin, 2 is Customer' })
  @IsNumber({})
  @IsIn([1, 2], {
    message: 'user_type_id must be either 1 (Admin) or 2 (Customer)',
  })
  user_type_id: number = 2;
}
