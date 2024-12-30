import { Module } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBookingController } from './ticket-booking.controller';

@Module({
  controllers: [TicketBookingController],
  providers: [TicketBookingService],
})
export class TicketBookingModule {}
