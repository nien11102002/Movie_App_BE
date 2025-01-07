import { Module } from '@nestjs/common';
import { TicketBookingService } from './ticket-booking.service';
import { TicketBookingController } from './ticket-booking.controller';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [TicketBookingController],
  providers: [TicketBookingService, PrismaService],
})
export class TicketBookingModule {}
