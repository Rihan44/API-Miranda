CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_type VARCHAR(255),
    room_number VARCHAR(255),
    price DOUBLE,
    offer_price BOOLEAN,
    discount INT,
    status VARCHAR(255),
    description LONGTEXT
)

CREATE TABLE IF NOT EXISTS room_photos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    room_photo_url VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS amenities (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amenity_name VARCHAR(255)
)

CREATE TABLE IF NOT EXISTS amenity_to_room (
    room_id INT,
    amenity_id INT,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (amenity_id) REFERENCES amenities(id)
);


CREATE TABLE IF NOT EXISTS bookings (
     id INT AUTO_INCREMENT PRIMARY KEY,
     guest VARCHAR(255),
     phone_number VARCHAR(255),
     order_date DATE,
     check_in DATE,
     check_out DATE,
     special_request TEXT,
     price DOUBLE,
     room_id INT,
     FOREIGN KEY (room_id) REFERENCES rooms(id)
);

CREATE TABLE IF NOT EXISTS users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255) UNIQUE,
     photo VARCHAR(255),
     employee_position VARCHAR(255),
     phone_number VARCHAR(255),
     hire_date DATE,
     job_description LONGTEXT,
     status BOOLEAN,
     password_hash VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS contact (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255),
     email VARCHAR(255),
     phone VARCHAR(255),
     email_subject VARCHAR(255),
     email_description LONGTEXT,
     date DATE,
     date_time DATETIME,
     is_archived BOOLEAN
);