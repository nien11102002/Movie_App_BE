import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';

//@Public()
@ApiBearerAuth()
@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get('get-cineplex-info')
  @ApiQuery({ name: 'cineplex_id', type: Number, required: false })
  getCineplexInfo(@Query('cineplex_id') cineplex_id: number) {
    return this.cinemaService.getCineplexInfo(+cineplex_id);
  }

  @Get('get-multiplex-info')
  @ApiQuery({ name: 'multiplex_id', type: Number, required: false })
  getMultiplexInfo(@Query('multiplex_id') multiplex_id: number) {
    return this.cinemaService.getMultiplexInfo(+multiplex_id);
  }

  @Get(`get-showtimes-by-cineplex`)
  @ApiQuery({ name: 'cineplex_id', type: Number, required: false })
  getShowtimesByCineplex(@Query('cineplex_id') cineplex_id: number) {
    return this.cinemaService.getShowtimesByCineplex(+cineplex_id);
  }

  @Get(`get-showtimes-by-movie`)
  @ApiQuery({ name: 'movie_id', type: Number, required: true })
  getShowtimesByMovie(@Query('movie_id') movie_id: number) {
    return this.cinemaService.getShowtimesByMovie(+movie_id);
  }
}
