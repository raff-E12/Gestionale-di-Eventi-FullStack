// Controller per i booking

const database = require("../database/database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const key = process.env.JWT_SECRET;
const querys = require("../js/querys.js")

function Booking_List(req, res) {
    const { email } = req.body;

    database.query(querys.bookings.list.query2, [email], (error, result) =>{

        if (result.length === "") return res.status(404).json({msg: "Utente non trovato", code: 404});

        const id = Number(result.map(element => element.id).join(""));
        const role = String(result.map(element => element.ruolo).join(""));

        if (role !== "admin") {
            database.query(querys.bookings.list.query1, [id], (error, results) =>{
                if (results.length === 0) return res.status(404).json({msg: "Lista Vuota", code: 404});
                return res.status(200).json({booking: results, code: 200});
            })
        } else{
            return res.status(400).json({msg: "Solo per chi è aministratore non può accedere, Riprova!!", code: 400});
        }

    })
}


function Add_Booking(req, res) {
    const { id, utente, state } = req.body;

    database.query(querys.bookings.add.email, [utente], (error, result) =>{

       if (result.length === 0) return res.status(404).json({msg: "Non esiste", code: 404});

       const id_users = Number(result[0].id);
       const state_string = String(state ? "confermato" : "in attesa");

        database.query(querys.bookings.add.create, [id, id_users, state_string], (error, result) => {
            if (error !== null && error.sqlState === "21S01") return res.status(400).json({msg: "Le richieste non sono soddisfate.", code: 400});
            return res.status(200).json({msg: "Aggiunto all Lista.", code: 200});
        })
    })
  
}

function Verify_Event(req, res) {
    const { email } = req.body;
    
    database.query(querys.bookings.verify.query2, [email], (error, result) =>{
        
        if (result.length === 0) return res.status(404).json({msg: "Utente non trovato", code: 404});
        const id_user = Number(result.map(element => element.id).join(""));

        database.query(querys.bookings.verify.query1, [id_user], (error, results) =>{
         if (results.length === 0) return res.status(404).json({msg: "Non hai prenotato nessun evento", code: 404});

          const events_id = [];
          const events_list = {};
          const id_events = new Set(results.map(element => element.evento_id)).forEach( element => events_id.push(element));

         if (events_id.length !== 0) {
            for (let key in events_id) {
                events_list[events_id[key]] = false;
            }
         }

          return res.status(200).json({msg: "L'Eventi Prenotati", code: 200, events: events_list});   
        })
    })
}


module.exports = {
    Booking_List,
    Add_Booking,
    Verify_Event
}