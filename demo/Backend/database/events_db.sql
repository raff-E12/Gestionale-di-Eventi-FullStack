
-- Creazione di un database per la gestione degli eventi
-- DataBase: 

-- Creazione del Database:
CREATE DATABASE events_management;
USE events_management;

-- Creazione delle seguenti tabelle:

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    hashed_key TEXT NOT NULL
);

-- Creazione della tabella Eventi
CREATE TABLE Events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(255) NOT NULL,
    descrizione TEXT,
    data_inizio DATETIME NOT NULL,
    data_fine DATETIME NOT NULL,
    creato_da INT NOT NULL,
    FOREIGN KEY (creato_da) REFERENCES Users(id) ON DELETE CASCADE
);

-- Creazione della tabella Prenotazioni
CREATE TABLE Bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    evento_id INT NOT NULL,
    utente_id INT NOT NULL,
    stato ENUM('confermato', 'in attesa') DEFAULT 'in attesa',
    FOREIGN KEY (evento_id) REFERENCES Events(id) ON DELETE CASCADE,
    FOREIGN KEY (utente_id) REFERENCES Users(id) ON DELETE CASCADE
);