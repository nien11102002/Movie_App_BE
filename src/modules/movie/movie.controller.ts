import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UploadedFile,
  UseInterceptors,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiQuery } from '@nestjs/swagger';
import cloudStorage from 'src/common/multer/upload-cloud-multer';
import { Public } from 'src/common/decorators/public.decorator';
import { from } from 'rxjs';
import { ParseDatePipe } from 'src/common/pipe/parse_date.pipe';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Public()
  @Get(`get-list-banner`)
  getListBanner() {
    return this.movieService.getListBanner();
  }

  @Public()
  @Get(`get-list-movie`)
  getListMovie(@Query('movie_name') movie_name: string) {
    return this.movieService.getListMovie(movie_name);
  }

  @Public()
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

  @Public()
  @Get(`get-list-movie-by-day`)
  getListMovieByDay(
    @Query('movie_name') movie_name: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('fromDate') fromDate: string,
    @Query('toDate') toDate: string,
  ) {
    return this.movieService.getListMovieByDay(
      movie_name,
      page,
      pageSize,
      fromDate,
      toDate,
    );
  }

  @Public()
  @Get(`movie-info`)
  getMovieInfo(@Query('movie_id') movie_id: string) {
    return this.movieService.getMovieInfo(+movie_id);
  }

  @Post('add-movie')
  @UseInterceptors(FileInterceptor('image', { storage: cloudStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload for the movie picture',
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        movie_name: { type: 'string' },
      },
    },
  })
  addMovie(
    @Body('movie_name') movie_name: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.movieService.addMovie(file, movie_name);
  }

  @Put('update-movie')
  @UseInterceptors(FileInterceptor('image', { storage: cloudStorage }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Input update info!',
    schema: {
      type: 'object',
      properties: {
        movie_name: { type: 'string' },
        description: { type: 'string' },
        trailer: { type: 'string' },
        premiere_day: { type: 'string', default: new Date().toISOString() },
        rating: { type: 'number' },
        hot: { type: 'boolean' },
        is_showing: { type: 'boolean' },
        is_coming: { type: 'boolean' },
        duration: { type: 'number' },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  updateMovie(
    @Query('movie_id') movie_id: number,
    @Body()
    updatedBody: UpdateMovieDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log({ updatedBody });
    return this.movieService.updateMovie(file, updatedBody, +movie_id);
  }

  @Delete('delete-movie')
  deleteMovie(@Query('movie_id') movie_id: string) {
    return this.movieService.deleteMovie(+movie_id);
  }
}
