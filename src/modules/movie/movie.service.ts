import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class MovieService {
  constructor(private prisma: PrismaService) {}
  async getListBanner() {
    const listBanner = await this.prisma.banners.findMany();
    return listBanner;
  }

  async getListMovie(movie_name: string) {
    const listMovie = await this.prisma.movies.findMany({
      where: { movie_name: { contains: movie_name } },
    });

    return listMovie;
  }

  async getListMoviePagination(
    movie_name: string,
    page: number,
    pageSize: number,
  ) {
    page = page > 0 ? page : 1;
    pageSize = pageSize > 0 ? pageSize : 10;
    const skip = (page - 1) * pageSize;

    const totalItem = await this.prisma.movies.count({
      where: {
        movie_name: {
          contains: movie_name || '',
        },
      },
    });

    const result = await this.prisma.movies.findMany({
      where: { movie_name: { contains: movie_name || '' } },
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: result || [],
    };
  }

  async getListMovieByDay(
    movie_name: string,
    page: number,
    pageSize: number,
    fromDate: Date,
    toDate: Date,
  ) {
    page = page > 0 ? page : 1;
    pageSize = pageSize > 0 ? pageSize : 10;
    const skip = (page - 1) * pageSize;

    const filterCondition = {
      movie_name: {
        contains: movie_name || '',
      },
      showtimes: {
        some: { showtime: { lte: toDate, gte: fromDate } },
      },
    };

    const totalItem = await this.prisma.movies.count({
      where: filterCondition,
    });

    const result = await this.prisma.movies.findMany({
      where: filterCondition,
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: 'asc',
      },
      include: {
        showtimes: { select: { showtime: true } },
      },
    });

    const totalPage = Math.ceil(totalItem / pageSize);

    return {
      page: page,
      pageSize: pageSize,
      totalItem: totalItem,
      totalPage: totalPage,
      items: result || [],
    };
  }

  async getMovieInfo(movie_id: number) {
    if (!movie_id || isNaN(+movie_id)) {
      throw new BadRequestException(
        'movie_id is required and must be a valid number',
      );
    }
    const movie = await this.prisma.movies.findFirst({
      where: { movie_id: movie_id },
    });
    return movie;
  }

  async deleteMovie(movie_id: number) {
    if (!movie_id || isNaN(+movie_id)) {
      throw new BadRequestException(
        'movie_id is required and must be a valid number',
      );
    }
    await this.prisma.movies.delete({ where: { movie_id: movie_id } });
    return `Successfully delete movie ${movie_id}`;
  }
}
