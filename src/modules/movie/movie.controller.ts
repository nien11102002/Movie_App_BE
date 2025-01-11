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
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get(`get-list-banner`)
  getListBanner() {
    return this.movieService.getListBanner();
  }

  @Get(`get-list-movie`)
  getListMovie(@Query('movie_name') movie_name: string) {
    return this.movieService.getListMovie(movie_name);
  }

  @Get(`get-list-movie-pagination`)
  getListMoviePagination(
    @Query('movie_name') movie_name: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    return this.movieService.getListMoviePagination(
      movie_name,
      +page,
      +pageSize,
    );
  }

  @Get(`get-list-movie-by-day`)
  getListMovieByDay(
    @Query('movie_name') movie_name: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('fromDate') fromDate: Date,
    @Query('toDate') toDate: Date,
  ) {
    return this.movieService.getListMovieByDay(
      movie_name,
      page,
      pageSize,
      fromDate,
      toDate,
    );
  }

  @Get(`movie-info`)
  getMovieInfo(@Query('movie_id') movie_id: string) {
    return this.movieService.getMovieInfo(+movie_id);
  }

  @Delete('delete-movie')
  deleteMovie(@Query('movie_id') movie_id: string) {
    return this.movieService.deleteMovie(+movie_id);
  }
}
