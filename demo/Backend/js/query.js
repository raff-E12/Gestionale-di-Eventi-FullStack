// Query SQL:

const query_sql = {
    users:{
        register: `INSERT INTO users (nome, email, password, hashed_key, ruolo) VALUES (?, ?, ?, ?, ?)`,
        login: {
            query1: "SELECT hashed_key FROM users WHERE email = ?",
            query2: "SELECT email, ruolo, nome FROM users WHERE email = ?"
        },
        cancel: "DELETE FROM users WHERE email = ?"
    },
    events: {
        all: `SELECT tb1.id, tb1.title, tb1.description, 
        tb1.start, tb1.end, (SELECT tb2.nome FROM users AS tb2 WHERE tb2.id = tb1.organizer) 
        AS  organizer FROM events AS tb1`,
        users: {
            query1: `SELECT tb1.id, tb1.title, tb1.description, 
            tb1.start, tb1.end, (SELECT tb2.nome FROM users AS tb2 WHERE tb2.id = tb1.organizer) 
            AS  organizer FROM events AS tb1 WHERE organizer = ?`,
            query2: "SELECT id FROM users WHERE email = ?"
        },
        add: {
            query1: "SELECT id FROM users WHERE email = ?",
            query2: `INSERT INTO events (title, description, start, end, organizer) VALUES (?, ?, ?, ?, ?)`
        },
        delete: "DELETE FROM events WHERE id = ?",
        update_start: "UPDATE events SET start = ? WHERE id = ?",
        update_end: "UPDATE events SET end = ? WHERE id = ?",
        update: {
            query1: "UPDATE events SET title = ? WHERE id = ?",
            query2: "UPDATE events SET description = ? WHERE id = ?",
            query3: "UPDATE events SET start = ? WHERE id = ?",
            query4: "UPDATE events SET end = ? WHERE id = ?"
        }
    },
    bookings: {
        list: {
            query1: `SELECT tb1.id, (SELECT nome FROM users WHERE users.id = tb1.utente_id) AS utente, 
            (SELECT title FROM events WHERE events.id = tb1.evento_id) AS evento, tb2.start AS inizio, 
            tb1.stato FROM bookings AS tb1 INNER JOIN events AS tb2
            ON tb1.evento_id = tb2.id WHERE tb1.utente_id = ?`,
            query2: "SELECT id, ruolo FROM users WHERE email = ?"
        },
        add: {
            email: "SELECT id FROM users WHERE email = ?",
            create: "INSERT INTO bookings (evento_id, utente_id, stato) VALUES (?, ?, ?)"
        },
        verify: {
            query1: "SELECT evento_id FROM bookings WHERE utente_id = ?",
            query2: "SELECT id FROM users WHERE email = ?"
        }
    },
    extra: {
        statistic: `SELECT (SELECT COUNT(id) FROM bookings) AS totale_prenotazioni, (SELECT COUNT(id) FROM users) AS totale_utenti,
        (SELECT COUNT(id) FROM bookings WHERE stato = "confermato") AS eventi_confermati, 
        (SELECT COUNT(id) FROM bookings WHERE stato = "in attesa") AS eventi_in_attesa`,
        role: 'SELECT ruolo, id FROM users WHERE email = ?',
        events: "SELECT * FROM events where organizer = ?",
        bookings: `SELECT tb1.id, (SELECT nome FROM users WHERE users.id = tb1.utente_id) AS utente, 
        (SELECT title FROM events WHERE events.id = tb1.evento_id) AS evento, tb2.start AS inizio, 
        tb1.stato FROM bookings AS tb1 INNER JOIN events AS tb2
        ON tb1.evento_id = tb2.id WHERE tb1.evento_id = ?`
    }
}

module.exports = query_sql;