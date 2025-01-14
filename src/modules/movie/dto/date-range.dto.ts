import { ApiProperty } from '@nestjs/swagger';

export class DateRangeDto {
  @ApiProperty()
  fromDate: Date;

  @ApiProperty()
  toDate: Date;
}
