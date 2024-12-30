import { Injectable } from '@nestjs/common';
import { CreateTicketBookingDto } from './dto/create-ticket-booking.dto';
import { UpdateTicketBookingDto } from './dto/update-ticket-booking.dto';

@Injectable()
export class TicketBookingService {
  create(createTicketBookingDto: CreateTicketBookingDto) {
    return 'This action adds a new ticketBooking';
  }

  findAll() {
    return `This action returns all ticketBooking`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ticketBooking`;
  }

  update(id: number, updateTicketBookingDto: UpdateTicketBookingDto) {
    return `This action updates a #${id} ticketBooking`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketBooking`;
  }
}
