import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketBookingModule } from './modules/ticket-booking/ticket-booking.module';
import { UserModule } from './modules/user/user.module';
import { MovieModule } from './modules/movie/movie.module';
import { CinemaModule } from './modules/cinema/cinema.module';

@Module({
  imports: [TicketBookingModule, UserModule, MovieModule, CinemaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
