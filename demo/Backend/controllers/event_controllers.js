const database = require("../database/database.js");
const jwt = require("jsonwebtoken");
const querys = require("../js/querys.js");

function Event_List(req, res) {

    database.query(querys.events.all, (error, result) =>{

    if (error) return res.status(500).json({msg: "Errore del server, Riprova!!", code: 500});
    const object_events = result;

    const id_list = object_events.map((element) => element.id);
    const object_tamplate = [];

    object_events.forEach((element, index) =>{
       if (id_list[index] === element.id) {
         const obj = {
            id: element.id,
            title: element.title,
            start: element.start,
            end: element.end,
            extendedProps: {
            description: element.description,
            organizer: element.organizer
            }
          }
          object_tamplate.push(obj);
       }
    })

    return res.status(200).json({events: object_tamplate, code: 200});
    })
}

function Add_Events(req, res) {
    const { title, description, start, end, organizer } = req.body;

    database.query(querys.events.add.query1, [organizer], (error, result) => {
    const name_organizzer = Number(result.map(element => element.id).join(""));

    database.query(querys.events.add.query2, [title, description, start, end, name_organizzer], (error, result) =>{
        return error !== null || error && error.code !== "ER_BAD_NULL_ERROR" && 
        error.code !== "ER_TRUNCATED_WRONG_VALUE" ? 
        res.status(400).json({msg: "Richiesta non andata a buon fine, Riprova!!", code: 400})
        : res.status(200).json({msg: "Richiesta è andata a buon fine", code: 200});
    })
    })
}

function Event_ID(req, res) {
    const { email } = req.body;

    database.query(querys.events.users.query2, [email], (error, results) => {

    if (results.length === 0) return res.status(404).json({msg: "Evento non trovato!!", code: 404});
    const id = results[0].id;

    database.query(querys.events.users.query1, [id], (error, result) => {

    if (error) return res.status(500).json({msg: "Errore del server, Riprova!!", code: 500});
    const object_events = result;
    const id_list = object_events.map((element) => element.id);
    const object_tamplate = [];

    object_events.forEach((element, index) => {
       if (id_list[index] === element.id) {
         const obj = {
            id: element.id,
            title: element.title,
            start: element.start,
            end: element.end,
            extendedProps: {
            description: element.description,
            organizer: element.organizer
            }
          }
          object_tamplate.push(obj);
       }
    })

    return res.status(200).json({events: object_tamplate, code: 200});
    })
    })
}


function Delete_Event(req, res) {
    const { id } = req.params;
    const id_index = Number(String(id).split("").filter(element => element !== ":").join(""));
    // console.log(id_index)
    database.query(querys.events.delete, [id_index], (error, result) => {
        if (error) return res.status(400).json({msg: "Operazione non Eseguita con successo", code: 400});
        return res.status(200).json({msg: "Operazione Eseguita con successo", code: 200});
    })
}

function Drag_DropMod(req, res) {
    const { idEvent } = req.params
    const { start, end } = req.body;

    const id = Number(idEvent.split(":")[1]);

    database.query(querys.events.update_start, [start, id], (error, result) => {
        if (error && error.code === "ER_TRUNCATED_WRONG_VALUE") return res.status(400).json({msg: "Formato data errato, Riprova!!", code: 400});
        if (result.affectedRows === 0) return res.status(404).json({msg: "Evento da modificare non trovata.", code: 404});

        database.query(querys.events.update_end, [end, id], (error, results) => {
            if (error && error.code === "ER_TRUNCATED_WRONG_VALUE") return res.status(400).json({msg: "Formato data errato, Riprova!!", code: 400});
            if (results.affectedRows === 0) return res.status(404).json({msg: "Evento da modificare non trovata.", code: 404});
            return res.status(200).json({msg: "Operazione Eseguita con successo.", code: 200});
        })
    })
}

function Update_Events(req, res) {
    const { id, title, description, start, end } = req.body;

    const format_start = String(start).replace("T", " ").replace("Z", " ").split(" ");
    const format_end = String(end).replace("T", " ").replace("Z", " ").split(" ");

    const data_format = {
        start: [format_start[0], " ", format_start[1].slice(0, 8)].join(""),
        end: [format_end[0], " ", format_end[1].slice(0, 8)].join(""),
    }

    database.query(querys.events.update.query1, [title, id], (errorTitles, titles) => {

        if(errorTitles) return res.status(400).json({msg: "Il Titolo non rispetta le credenziali", code: 400});
        if(titles.affectedRows === 0) return res.status(400).json({msg: "Il Titolo non modificato", code: 400});
        console.log(errorTitles);
        console.log(titles);

        database.query(querys.events.update.query2, [description, id], (errorDesc, descriptions) =>{
            if(errorDesc) return res.status(400).json({msg: "La Descrizione non rispetta le credenziali", code: 400});
            if(descriptions.affectedRows === 0) return res.status(400).json({msg: "Il Descrizione non modificato", code: 400});
            console.log(errorDesc);
            console.log(descriptions);

            database.query(querys.events.update.query3, [data_format.start, id], (errorStart, starts) => {
                if(errorStart && errorStart.code === "ER_TRUNCATED_WRONG_VALUE") return res.status(400).json({msg: "La Data di Inizio non rispetta le credenziali", code: 400});
                if(starts.affectedRows === 0) return res.status(400).json({msg: "Data di inizio non modificata", code: 400});
                console.log(errorStart);
                console.log(starts);

                database.query(querys.events.update.query4, [data_format.end, id], (errorEnd, ends) => {
                    if(errorEnd && errorEnd.code === "ER_TRUNCATED_WRONG_VALUE") return res.status(400).json({msg: "La Data di Fine non rispetta le credenziali", code: 400});
                    if(ends.affectedRows === 0) return res.status(400).json({msg: "Data di fine non modificata", code: 400});
                    console.log(errorEnd);
                    console.log(ends);
                    return res.status(200).json({msg: "Evento Aggiornato con successo!!", code: 200})
                })

            })
        })
    })
}

module.exports = {
    Event_List,
    Add_Events,
    Event_ID,
    Delete_Event,
    Drag_DropMod,
    Update_Events
}