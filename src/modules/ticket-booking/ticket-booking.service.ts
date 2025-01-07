import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import {
  NORMAL_SEAT,
  VIP_TICKET_PRICE_RATE,
} from 'src/common/constants/app.constant';
import { BookTicketDto } from './dto/create-ticket-booking.dto';
import { TUser } from 'src/common/types/types';
import { CreateShowtimeDto } from './dto/create-showtime.dto';

@Injectable()
export class TicketBookingService {
  constructor(private prisma: PrismaService) {}

  async bookTicket(list_ticket: BookTicketDto, user: TUser) {
    const { showtime_id, listBookedTicket } = list_ticket;
    const seatIds = listBookedTicket.map((ticket) => ticket.seat_id);

    const existingTickets = await this.prisma.ticket_bookings.findMany({
      where: {
        showtime_id: showtime_id,
        seat_id: { in: seatIds },
      },
    });

    if (existingTickets.length > 0) {
      throw new ConflictException(
        `Some seats are already booked: ${existingTickets
          .map((ticket) => ticket.seat_id)
          .join(', ')}`,
      );
    }

    const data = listBookedTicket.map((ticket) => ({
      seat_id: ticket.seat_id,
      showtime_id,
      account_id: user.account_id,
    }));
    console.log({ data });
    const newTickets = await this.prisma.ticket_bookings.createMany({
      data: data,
    });
    return newTickets;
  }

  async getListTicket(showtime_id: number) {
    const listTicket = await this.prisma.showtimes.findFirst({
      where: { showtime_id: showtime_id },
      select: {
        showtime_id: true,
        showtime: true,
        ticket_price: true,
        movies: { select: { movie_name: true, image: true } },
        cinemas: {
          select: {
            cinema_id: true,

            cinema_name: true,
            multiplexes: {
              select: {
                multiplex_name: true,
                address: true,
              },
            },
            seats: {
              select: {
                seat_id: true,
                seat_name: true,
                seat_type: true,
                ticket_bookings: {
                  select: { users: { select: { account: true } } },
                },
              },
            },
          },
        },
      },
    });

    const bookedTickets = await this.prisma.ticket_bookings.findMany({
      where: { showtime_id: showtime_id },
      select: {
        seat_id: true,
        users: { select: { account: true } },
      },
    });

    const result = {
      movieInfo: {
        showtime_id: listTicket.showtime_id,
        multiplex_name: listTicket.cinemas.multiplexes.multiplex_name,
        cinema_name: listTicket.cinemas.cinema_name,
        address: listTicket.cinemas.multiplexes.address,
        movie_name: listTicket.movies.movie_name,
        image: listTicket.movies.image,
        show_date: listTicket.showtime.toISOString().split('T')[0], // Date in YYYY-MM-DD format
        show_time: listTicket.showtime.toISOString().split('T')[1].slice(0, 5), // Time in HH:mm format
      },
      listSeat: listTicket.cinemas.seats.map((seat) => {
        const booking = bookedTickets.find(
          (ticket) => ticket.seat_id === seat.seat_id,
        );
        return {
          seat_id: seat.seat_id,
          seat_name: seat.seat_name,
          cinema_id: listTicket.cinemas.cinema_id,
          seat_type: seat.seat_type,
          ticket_price:
            seat.seat_type === NORMAL_SEAT
              ? listTicket.ticket_price
              : listTicket.ticket_price * VIP_TICKET_PRICE_RATE,
          isBooked: !!booking,
          booked_account: booking ? booking.users.account : null,
        };
      }),
    };
    return result;
  }

  async createShowtime(createShowtime: CreateShowtimeDto) {
    const { showtime, cinema_id } = createShowtime;

    const normalizedShowtime = new Date(showtime);
    normalizedShowtime.setMilliseconds(0);
    // console.log({ normalizedShowtime, cinema_id });

    const existingShowtime = await this.prisma.showtimes.findFirst({
      where: {
        cinema_id: cinema_id,
        showtime: normalizedShowtime,
      },
    });
    // console.log({ existingShowtime });

    if (existingShowtime) {
      throw new ConflictException(
        `A showtime already exists at this time (${showtime}) for cinema ID ${cinema_id}.`,
      );
    }

    const newShowtime = await this.prisma.showtimes.create({
      data: createShowtime,
    });

    return newShowtime;
  }
}
