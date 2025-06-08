-- Insert fake users
INSERT INTO users (first_users, last_users, email, phone, password, role, hash_key, img_users) VALUES
('Mario', 'Rossi', 'mario.rossi@example.com', '3331234567', 'hashed_password_1', 'admin', NULL, NULL),
('Luca', 'Bianchi', 'luca.bianchi@example.com', '3332345678', 'hashed_password_2', 'users', NULL, NULL),
('Giulia', 'Verdi', 'giulia.verdi@example.com', '3333456789', 'hashed_password_3', 'users', NULL, NULL),
('Anna', 'Neri', 'anna.neri@example.com', NULL, 'hashed_password_4', 'users', NULL, NULL);

-- Insert fake locations
INSERT INTO location (location, address, city_events, descriptions_location, location_img) VALUES
('Sala Conferenze Milano', 'Via Roma 1', 'Milano', 'Ampia sala conferenze in centro città', NULL),
('Centro Eventi Torino', 'Corso Francia 100', 'Torino', 'Spazio moderno per eventi e meeting', NULL),
('Auditorium Napoli', 'Via Napoli 50', 'Napoli', 'Auditorium con 300 posti', NULL);

-- Insert fake events
INSERT INTO events (title_events, descriptions_events, date_start, date_end, id_location, users_id) VALUES
('Workshop di Programmazione', 'Impara le basi della programmazione', '2025-07-10 09:00:00', '2025-07-10 17:00:00', 1, 1),
('Conferenza Tech', 'Ultime novità dal mondo tech', '2025-08-05 10:00:00', '2025-08-05 18:00:00', 2, 2),
('Seminario Marketing', 'Strategie di marketing digitale', '2025-09-15 14:00:00', '2025-09-15 18:00:00', 3, 3),
('Corso Fotografia', 'Corso base di fotografia', '2025-07-20 09:00:00', '2025-07-20 16:00:00', 1, 4);

-- Insert fake bookings
INSERT INTO bookings (id_events, id_users, date_booking, states) VALUES
(1, 2, '2025-06-01 10:00:00', 'confirm'),
(1, 3, '2025-06-02 11:00:00', 'is_pending'),
(2, 4, '2025-06-03 12:00:00', 'confirm'),
(3, 1, '2025-06-04 13:00:00', 'deleted'),
(4, 2, '2025-06-05 09:30:00', 'confirm');