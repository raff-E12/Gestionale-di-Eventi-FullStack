// Query SQL: 

const querys = {
    events: {
        all: `SELECT tb1.id, tb1.title, tb1.description, 
        tb1.start, tb1.end, (SELECT tb2.nome FROM users AS tb2 WHERE tb2.id = tb1.organizer) 
        AS  organizer FROM events AS tb1`
    }
}

export default querys