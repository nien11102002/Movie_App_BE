import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { CreateTicketBookingDto } from './dto/create-ticket-booking.dto';
import { UpdateTicketBookingDto } from './dto/update-ticket-booking.dto';

@Controller('ticket-booking')
export class TicketBookingController {
  constructor(private readonly ticketBookingService: TicketBookingService) {}

  @Post()
  create(@Body() createTicketBookingDto: CreateTicketBookingDto) {
    return this.ticketBookingService.create(createTicketBookingDto);
  }

  @Get()
  findAll() {
    return this.ticketBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketBookingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketBookingDto: UpdateTicketBookingDto) {
    return this.ticketBookingService.update(+id, updateTicketBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketBookingService.remove(+id);
  }
}
