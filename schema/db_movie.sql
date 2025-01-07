DROP DATABASE IF EXISTS db_movie;
CREATE DATABASE IF NOT EXISTS db_movie;

USE db_movie;

CREATE TABLE movies (
    movie_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_name VARCHAR(255),
    trailer VARCHAR(255),
    image VARCHAR(255),
    description VARCHAR(255),
    premiere_day TIMESTAMP,
    rating INT,
    hot BOOLEAN,
    is_showing BOOLEAN,
    is_coming BOOLEAN,
    duration INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE banners (
    banner_id INT PRIMARY KEY AUTO_INCREMENT,
    movie_id INT,
    image VARCHAR(255),

    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cineplexes (
    cineplex_id INT PRIMARY KEY AUTO_INCREMENT,
    cineplex_name VARCHAR(255),
    logo VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE multiplexes (
    multiplex_id INT PRIMARY KEY AUTO_INCREMENT,
    multiplex_name VARCHAR(255),
    `address` VARCHAR(255),
    cineplex_id INT,

    FOREIGN KEY (cineplex_id) REFERENCES cineplexes(cineplex_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cinemas (
    cinema_id INT PRIMARY KEY AUTO_INCREMENT,
    cinema_name VARCHAR(255),
    multiplex_id INT,

    FOREIGN KEY (multiplex_id) REFERENCES multiplexes(multiplex_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE seats (
    seat_id INT PRIMARY KEY AUTO_INCREMENT,
    seat_name VARCHAR(255),
    seat_type VARCHAR(255),
    cinema_id INT,

    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
    account_id INT PRIMARY KEY AUTO_INCREMENT,
    account VARCHAR(255) UNIQUE,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone_number VARCHAR(15),
    `password` VARCHAR(255),
    user_type VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE showtimes (
    showtime_id INT PRIMARY KEY AUTO_INCREMENT,
    cinema_id INT,
    movie_id INT,
    showtime TIMESTAMP,
    ticket_price INT,

    FOREIGN KEY (movie_id) REFERENCES movies(movie_id) ON DELETE CASCADE,
    FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ticket_bookings (
    account_id INT,
    showtime_id INT,
    seat_id INT,

    PRIMARY KEY (account_id, showtime_id, seat_id),
    FOREIGN KEY (account_id) REFERENCES users(account_id) ON DELETE CASCADE,
    FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id) ON DELETE CASCADE,
    FOREIGN KEY (seat_id) REFERENCES seats(seat_id) ON DELETE CASCADE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert initial movies
INSERT INTO movies (movie_name, trailer, image, description, premiere_day, rating, hot, is_showing, is_coming)
VALUES 
('Inception', 'https://youtube.com/trailer_inception', 'inception.jpg', 'A thief who steals corporate secrets through dream-sharing technology.', '2024-01-01 00:00:00', 9, true, true, false),
('Avatar 2', 'https://youtube.com/trailer_avatar2', 'avatar2.jpg', 'Jake Sully lives with his newfound family on Pandora.', '2024-01-15 00:00:00', 8, false, true, false),
('The Matrix', 'https://youtube.com/trailer_matrix', 'matrix.jpg', 'A computer hacker learns about the true nature of reality.', '2023-12-01 00:00:00', 10, true, false, true);

-- Insert initial banners
INSERT INTO banners (movie_id, image)
VALUES 
(1, 'banner_inception.jpg'),
(2, 'banner_avatar2.jpg'),
(3, 'banner_matrix.jpg');

-- Insert cineplexes
INSERT INTO cineplexes (cineplex_name, logo)
VALUES 
('Cineworld', 'cineworld_logo.jpg'),
('AMC Theatres', 'amc_logo.jpg'),
('Regal Cinemas', 'regal_logo.jpg');

-- Insert multiplexes
INSERT INTO multiplexes (multiplex_name, address, cineplex_id)
VALUES 
('Cineworld Downtown', '123 Main St', 1),
('AMC Uptown', '456 High St', 2),
('Regal Mall', '789 Center St', 3);

-- Insert cinemas
INSERT INTO cinemas (cinema_name, multiplex_id)
VALUES 
('Cineworld Downtown Cinema 1', 1),
('AMC Uptown Cinema 1', 2),
('Regal Mall Cinema 1', 3);

-- Insert seats
INSERT INTO seats (seat_name, seat_type, cinema_id)
VALUES 
('A1', 'VIP', 1),
('A2', 'Standard', 1),
('B1', 'Standard', 2),
('B2', 'VIP', 2),
('C1', 'Standard', 3),
('C2', 'Standard', 3);

-- Insert users
INSERT INTO users (account,full_name, email, phone_number, password, user_type)
VALUES 
('johndoe','John Doe', 'john.doe@example.com', '1234567890', 'password123', 'customer'),
('janesmith','Jane Smith', 'jane.smith@example.com', '0987654321', 'password123', 'admin');

-- Insert showtimes
INSERT INTO showtimes (cinema_id, movie_id, showtime, ticket_price)
VALUES 
(1, 1, '2024-01-02 19:00:00', 15),
(2, 2, '2024-01-16 20:00:00', 12),
(3, 3, '2023-12-02 18:00:00', 10);

-- Insert ticket bookings
INSERT INTO ticket_bookings (account_id, showtime_id, seat_id)
VALUES 
(1, 1, 1),
(2, 2, 4),
(1, 3, 5);
