DROP DATABASE IF EXISTS db_movie;
CREATE DATABASE IF NOT EXISTS db_movie;

use db_movie;

CREATE TABLE movies (
	movie_id INT PRIMARY KEY AUTO_INCREMENT,
	movie_name VARCHAR(255),
	trailer VARCHAR(255),
	image VARCHAR(255),
	description VARCHAR(255),
	premiere_day TIMESTAMP DEFAULT,
	rating INT,
	hot BOOLEAN,
	is_showing BOOLEAN,
	is_coming BOOLEAN,
		
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE banners (
	banner_id INT PRIMARY KEY AUTO_INCREMENT,
	movie_id INT,
	image VARCHAR(255),
	
	FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cinema_chains (
	cinema_chain_id INT PRIMARY KEY AUTO_INCREMENT,
	cinema_chain_name VARCHAR(255),
	logo VARCHAR(255),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE multiplexes (
	multiplex_id INT PRIMARY KEY AUTO_INCREMENT,
	multiplex_name VARCHAR(255),
	`address` VARCHAR(255),
	cinema_chain_id INT,
	
	FOREIGN KEY (cinema_chain_id) REFERENCES cinema_chains(cinema_chain_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE cinemas (
	cinema_id INT PRIMARY KEY AUTO_INCREMENT,
	cinema_name VARCHAR(255),
	multiplex_id INT,
	
	FOREIGN KEY (multiplex_id) REFERENCES multiplexs(multiplex_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE seats (
	seat_id INT PRIMARY KEY AUTO_INCREMENT,
	seat_name VARCHAR(255),
	seat_type VARCHAR(255),
	cinema_id INT,
	
	FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (
	account_id  INT PRIMARY KEY AUTO_INCREMENT,
	full_name VARCHAR(255),
	email VARCHAR(255),
	phone_number VARCHAR(10),
	`password` VARCHAR(255),
	user_type VARCHAR(255),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE showtimes (
	showtime_id  INT PRIMARY KEY AUTO_INCREMENT,
	cinema_id INT,
	movie_id INT,
	showtime TIMESTAMP,
	ticket_price INT,

	FOREIGN KEY (movie_id) REFERENCES movies(movie_id),
	FOREIGN KEY (cinema_id) REFERENCES cinemas(cinema_id),
	
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ticket_bookings (
	account_id  INT,
	showtime_id INT,
	seat_id INT,
	
	PRIMARY KEY (account_id,showtime_id,seat_id),
	FOREIGN KEY (account_id) REFERENCES users(account_id),
	FOREIGN KEY (showtime_id) REFERENCES showtimes(showtime_id),
	FOREIGN KEY (seat_id) REFERENCES seats(seat_id),

	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);