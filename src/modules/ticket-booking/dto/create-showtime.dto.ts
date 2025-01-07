import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateShowtimeDto {
  @ApiProperty()
  @IsNumber({}, {})
  movie_id: number;

  @ApiProperty()
  @IsDateString()
  showtime: Date;

  @ApiProperty()
  cinema_id: number;

  @ApiProperty()
  ticket_price: number;
}
