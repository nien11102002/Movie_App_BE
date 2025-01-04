import { Injectable } from '@nestjs/common';
import { CreateCinemaDto } from './dto/create-cinema.dto';
import { UpdateCinemaDto } from './dto/update-cinema.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { privateDecrypt } from 'crypto';

@Injectable()
export class CinemaService {
  constructor(private prisma: PrismaService) {}

  async getCineplexInfo(cineplex_id?: number) {
    const listCineplex = await this.prisma.cineplexes.findMany({
      where: cineplex_id ? { cineplex_id: cineplex_id } : undefined,
      select: {
        cineplex_id: true,
        cineplex_name: true,
        logo: true,
      },
    });

    return listCineplex;
  }

  async getMultiplexInfo(multiplex_id?: number) {
    const listMultiplex = await this.prisma.multiplexes.findMany({
      where: multiplex_id ? { multiplex_id: multiplex_id } : undefined,
      select: {
        multiplex_id: true,
        multiplex_name: true,
        address: true,
        cinemas: {
          select: {
            cinema_id: true,
            cinema_name: true,
          },
        },
      },
    });

    return listMultiplex;
  }

  async getShowtimesByCineplex(cineplex_id: number) {
    const cineplex = await this.prisma.cineplexes.findFirst({
      where: { cineplex_id: cineplex_id },
      select: {
        multiplexes: {
          select: {
            cinemas: {
              select: {
                showtimes: {
                  select: {
                    showtime_id: true,
                    ticket_price: true,
                    showtime: true,
                    movies: {
                      select: {
                        movie_id: true,
                        movie_name: true,
                        is_coming: true,
                        is_showing: true,
                        hot: true,
                        image: true,
                      },
                    },
                  },
                },
                cinema_id: true,
                cinema_name: true,
              },
            },
            multiplex_id: true,
            multiplex_name: true,
            address: true,
          },
        },
        cineplex_id: true,
        cineplex_name: true,
        logo: true,
      },
    });

    const result = {
      multiplexes: cineplex.multiplexes.map((multiplex) => ({
        listMovie: multiplex.cinemas.map((cinema) => ({
          listShowtimeByMovie: cinema.showtimes.map((showtime) => ({
            showtime_id: showtime.showtime_id,
            cinema_id: cinema.cinema_id,
            cinema_name: cinema.cinema_name,
            showtime: showtime.showtime,
            ticket_price: showtime.ticket_price,
          })),
          movie_id: cinema.showtimes[0].movies.movie_id,
          movie_name: cinema.showtimes[0].movies.movie_name,
          image: cinema.showtimes[0].movies.image,
          hot: cinema.showtimes[0].movies.hot,
          is_showing: cinema.showtimes[0].movies.is_showing,
          is_coming: cinema.showtimes[0].movies.is_coming,
        })),
        multiplex_id: multiplex.multiplex_id,
        multiplex_name: multiplex.multiplex_name,
        address: multiplex.address,
      })),
      cineplex_id: cineplex_id,
      cineplex_name: cineplex.cineplex_name,
      logo: cineplex.logo,
    };

    return result;
  }

  async getShowtimesByMovie(movie_id: number) {
    const cineplexes = await this.prisma.cineplexes.findMany({
      where: {
        multiplexes: {
          some: {
            cinemas: {
              some: {
                showtimes: {
                  some: { movie_id: movie_id },
                },
              },
            },
          },
        },
      },
      select: {
        multiplexes: {
          select: {
            cinemas: {
              select: {
                showtimes: {
                  select: {
                    showtime_id: true,
                    ticket_price: true,
                    showtime: true,
                    // duration:true,
                  },
                },
                cinema_id: true,
                cinema_name: true,
              },
            },
            multiplex_id: true,
            multiplex_name: true,
            address: true,
          },
        },
        cineplex_id: true,
        cineplex_name: true,
        logo: true,
      },
    });

    const movie = await this.prisma.movies.findFirst({
      where: { movie_id: movie_id },
      select: {
        movie_name: true,
        trailer: true,
        description: true,
        is_coming: true,
        is_showing: true,
        hot: true,
        image: true,
        premiere_day: true,
        rating: true,
      },
    });

    var result = {
      cineplexes: cineplexes.map((cineplex) => ({
        multiplexes: cineplex.multiplexes.map((multiplex) => ({
          showtimes: multiplex.cinemas.flatMap((cinema) =>
            cinema.showtimes.map((showtime) => ({
              showtime_id: showtime.showtime_id,
              showtime: showtime.showtime,
              ticket_price: showtime.ticket_price,
              cinema_id: cinema.cinema_id,
              cinema_name: cinema.cinema_name,
            })),
          ),
          multiplex_id: multiplex.multiplex_id,
          multiplex_name: multiplex.multiplex_name,
          address: multiplex.address,
        })),
        cineplex_id: cineplex.cineplex_id,
        cineplex_name: cineplex.cineplex_name,
        logo: cineplex.logo,
      })),
      ...movie,
    };

    return result;
  }
}
