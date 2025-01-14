import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateMovieDto {
  @ApiProperty({ description: 'Name of the movie', required: false })
  @IsOptional()

  //   @Transform(({ value }) => value?.movie_name)
  movie_name: string;

  @ApiProperty({ description: 'Description of the movie', required: false })
  @IsOptional()

  //   @Transform(({ value }) => value?.description)
  description: string;

  @ApiProperty({ description: 'Trailer link of the movie', required: false })
  @IsOptional()

  //   @Transform(({ value }) => value?.trailer)
  trailer: string;

  @ApiProperty({
    description: 'Premiere_day of the movie',
    required: false,
    default: new Date(),
  })
  @IsOptional()
  //   @IsDateString()
  //   @Transform(({ value }) => value.premiere_day)
  premiere_day: Date;

  @ApiProperty({ description: 'rating of the movie', required: false })
  @IsOptional()
  //   @Transform(({ value }) => value.rating)
  rating: number;

  @ApiProperty({ description: 'hot of the movie', required: false })
  @IsOptional()

  //   @Transform(({ value }) => value.hot)
  hot: boolean;

  @ApiProperty({ description: 'is_showing of the movie', required: false })
  @IsOptional()

  //   @Transform(({ value }) => value.is_showing)
  is_showing: boolean;

  @ApiProperty({ description: 'is_coming of the movie', required: false })
  @IsOptional()

  //   @Transform(({ value }) => value.is_coming)
  is_coming: boolean;

  @ApiProperty({ description: 'Duration of the movie', required: false })
  @IsOptional()

  //   @Transform(({ value }) => value.duration)
  duration: number;
}
