import { Test, TestingModule } from '@nestjs/testing';
import { TicketBookingService } from './ticket-booking.service';

describe('TicketBookingService', () => {
  let service: TicketBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketBookingService],
    }).compile();

    service = module.get<TicketBookingService>(TicketBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
