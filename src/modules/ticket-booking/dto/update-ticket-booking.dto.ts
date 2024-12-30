import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketBookingDto } from './create-ticket-booking.dto';

export class UpdateTicketBookingDto extends PartialType(CreateTicketBookingDto) {}
