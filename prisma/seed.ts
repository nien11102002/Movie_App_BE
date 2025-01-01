import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert movies
  await prisma.movies.createMany({
    data: [
      {
        movie_name: 'Inception',
        trailer: 'https://youtube.com/trailer_inception',
        image: 'inception.jpg',
        description:
          'A thief who steals corporate secrets through dream-sharing technology.',
        premiere_day: new Date('2024-01-01T00:00:00Z'),
        rating: 9,
        hot: true,
        is_showing: true,
        is_coming: false,
      },
      {
        movie_name: 'Avatar 2',
        trailer: 'https://youtube.com/trailer_avatar2',
        image: 'avatar2.jpg',
        description: 'Jake Sully lives with his newfound family on Pandora.',
        premiere_day: new Date('2024-01-15T00:00:00Z'),
        rating: 8,
        hot: false,
        is_showing: true,
        is_coming: false,
      },
      {
        movie_name: 'The Matrix',
        trailer: 'https://youtube.com/trailer_matrix',
        image: 'matrix.jpg',
        description:
          'A computer hacker learns about the true nature of reality.',
        premiere_day: new Date('2023-12-01T00:00:00Z'),
        rating: 10,
        hot: true,
        is_showing: false,
        is_coming: true,
      },
    ],
  });

  // Insert banners
  await prisma.banners.createMany({
    data: [
      { movie_id: 1, image: 'banner_inception.jpg' },
      { movie_id: 2, image: 'banner_avatar2.jpg' },
      { movie_id: 3, image: 'banner_matrix.jpg' },
    ],
  });

  // Insert cineplexes
  await prisma.cineplexes.createMany({
    data: [
      { cineplex_name: 'Cineworld', logo: 'cineworld_logo.jpg' },
      { cineplex_name: 'AMC Theatres', logo: 'amc_logo.jpg' },
      { cineplex_name: 'Regal Cinemas', logo: 'regal_logo.jpg' },
    ],
  });

  // Insert multiplexes
  await prisma.multiplexes.createMany({
    data: [
      {
        multiplex_name: 'Cineworld Downtown',
        address: '123 Main St',
        cineplex_id: 1,
      },
      { multiplex_name: 'AMC Uptown', address: '456 High St', cineplex_id: 2 },
      {
        multiplex_name: 'Regal Mall',
        address: '789 Center St',
        cineplex_id: 3,
      },
    ],
  });

  // Insert cinemas
  await prisma.cinemas.createMany({
    data: [
      { cinema_name: 'Cineworld Downtown Cinema 1', multiplex_id: 1 },
      { cinema_name: 'AMC Uptown Cinema 1', multiplex_id: 2 },
      { cinema_name: 'Regal Mall Cinema 1', multiplex_id: 3 },
    ],
  });

  // Insert seats
  await prisma.seats.createMany({
    data: [
      { seat_name: 'A1', seat_type: 'VIP', cinema_id: 1 },
      { seat_name: 'A2', seat_type: 'Standard', cinema_id: 1 },
      { seat_name: 'B1', seat_type: 'Standard', cinema_id: 2 },
      { seat_name: 'B2', seat_type: 'VIP', cinema_id: 2 },
      { seat_name: 'C1', seat_type: 'Standard', cinema_id: 3 },
      { seat_name: 'C2', seat_type: 'Standard', cinema_id: 3 },
    ],
  });

  // Insert users
  await prisma.users.createMany({
    data: [
      {
        account: 'johndoe',
        full_name: 'John Doe',
        email: 'john.doe@example.com',
        phone_number: '1234567890',
        password: 'password123',
        user_type: 'customer',
      },
      {
        account: 'janesmith',
        full_name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone_number: '0987654321',
        password: 'password123',
        user_type: 'admin',
      },
    ],
  });

  // Insert showtimes
  await prisma.showtimes.createMany({
    data: [
      {
        cinema_id: 1,
        movie_id: 1,
        showtime: new Date('2024-01-02T19:00:00Z'),
        ticket_price: 15,
      },
      {
        cinema_id: 2,
        movie_id: 2,
        showtime: new Date('2024-01-16T20:00:00Z'),
        ticket_price: 12,
      },
      {
        cinema_id: 3,
        movie_id: 3,
        showtime: new Date('2023-12-02T18:00:00Z'),
        ticket_price: 10,
      },
    ],
  });

  // Insert ticket bookings
  await prisma.ticket_bookings.createMany({
    data: [
      { account_id: 1, showtime_id: 1, seat_id: 1 },
      { account_id: 2, showtime_id: 2, seat_id: 4 },
      { account_id: 1, showtime_id: 3, seat_id: 5 },
    ],
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
