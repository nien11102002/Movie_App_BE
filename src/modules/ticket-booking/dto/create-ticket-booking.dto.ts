import { ApiProperty } from '@nestjs/swagger';

export class BookTicketDto {
  @ApiProperty()
  showtime_id: number;

  @ApiProperty()
  listBookedTicket: TTicket[];
}

type TTicket = {
  seat_id: number;
  ticket_price: number;
};
