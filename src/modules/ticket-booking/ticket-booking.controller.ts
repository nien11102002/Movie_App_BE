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
import { TicketBookingService } from './ticket-booking.service';
import { ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import { BookTicketDto } from './dto/create-ticket-booking.dto';
import { User } from 'src/common/decorators/user.decorator';
import { TUser } from 'src/common/types/types';
import { CreateShowtimeDto } from './dto/create-showtime.dto';
import { Public } from 'src/common/decorators/public.decorator';

@ApiBearerAuth()
@Controller('ticket-booking')
export class TicketBookingController {
  constructor(private readonly ticketBookingService: TicketBookingService) {}

  @Post(`ticket-booking`)
  @ApiBody({
    description: 'Body for booking tickets',
    schema: {
      type: 'object',
      properties: {
        showtime_id: { type: 'number', example: 1 },
        listBookedTicket: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              seat_id: { type: 'number', example: 1 },
              ticket_price: { type: 'number', example: 15 },
            },
          },
          example: [
            { seat_id: 1, ticket_price: 15 },
            { seat_id: 2, ticket_price: 15 },
          ],
        },
      },
    },
  })
  bookTicket(@Body() list_ticket: BookTicketDto, @User() user: TUser) {
    return this.ticketBookingService.bookTicket(list_ticket, user);
  }

  @Public()
  @Get(`get-list-ticket`)
  @ApiQuery({ name: 'showtime_id', type: Number, required: false })
  getListTicket(@Query('showtime_id') showtime_id: number) {
    return this.ticketBookingService.getListTicket(+showtime_id);
  }

  @Post(`create-showtime`)
  createShowtime(@Body() createShowtime: CreateShowtimeDto) {
    return this.ticketBookingService.createShowtime(createShowtime);
  }
}
