import { Test, TestingModule } from '@nestjs/testing';
import { TicketBookingController } from './ticket-booking.controller';
import { TicketBookingService } from './ticket-booking.service';

describe('TicketBookingController', () => {
  let controller: TicketBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TicketBookingController],
      providers: [TicketBookingService],
    }).compile();

    controller = module.get<TicketBookingController>(TicketBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
