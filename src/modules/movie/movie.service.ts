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
    fromDate: string,
    toDate: string,
  ) {
    const parsedFromDate = new Date(fromDate);
    const parsedToDate = new Date(toDate);

    const isValidFromDate = !isNaN(parsedFromDate.getTime());
    const isValidToDate = !isNaN(parsedToDate.getTime());

    page = page > 0 ? page : 1;
    pageSize = pageSize > 0 ? pageSize : 10;
    const skip = (page - 1) * pageSize;

    console.log({ fromDate, toDate });

    const filterCondition: any = {
      movie_name: {
        contains: movie_name || '',
      },
    };

    if (isValidFromDate || isValidToDate) {
      filterCondition.showtimes = {
        some: {
          showtime: {
            ...(isValidFromDate ? { gte: parsedFromDate } : {}),
            ...(isValidToDate ? { lte: parsedToDate } : {}),
          },
        },
      };
    }

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
        showtimes: {
          where: {
            showtime: {
              ...(isValidFromDate ? { gte: parsedFromDate } : {}),
              ...(isValidToDate ? { lte: parsedToDate } : {}),
            },
          },
          select: {
            showtime: true,
          },
        },
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

  async addMovie(file: Express.Multer.File, movie_name: string) {
    const newMovie = await this.prisma.movies.create({
      data: { movie_name: movie_name, image: file.path },
    });

    return newMovie;
  }

  async updateMovie(
    file: Express.Multer.File,
    updatedBody: UpdateMovieDto,
    movie_id: number,
  ) {
    const existedMovie = this.prisma.movies.findFirst({
      where: { movie_id: movie_id },
    });
    if (!existedMovie)
      throw new BadRequestException(`No exist movie_id ${movie_id}`);
    const updateData: any = {};

    if (updatedBody.movie_name) updateData.movie_name = updatedBody.movie_name;
    if (updatedBody.description)
      updateData.description = updatedBody.description;
    if (updatedBody.trailer) updateData.trailer = updatedBody.trailer;
    if (updatedBody.premiere_day)
      updateData.premiere_day = updatedBody.premiere_day;
    if (updatedBody.rating) updateData.rating = Number(updatedBody.rating);
    if (updatedBody.hot !== undefined)
      updateData.hot = Boolean(updatedBody.hot);
    if (updatedBody.is_showing !== undefined)
      updateData.is_showing = Boolean(updatedBody.is_showing);
    if (updatedBody.is_coming !== undefined)
      updateData.is_coming = Boolean(updatedBody.is_coming);
    if (updatedBody.duration)
      updateData.duration = Number(updatedBody.duration);

    if (file) {
      updateData.image = file.path;
    }

    console.log({ updateData });

    const updatedMovie = await this.prisma.movies.update({
      where: { movie_id: movie_id },
      data: updateData,
    });

    return updatedMovie;
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
