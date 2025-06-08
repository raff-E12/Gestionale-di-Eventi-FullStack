// Controllers per la gestione utenti

const database = require("../database/database.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const querys = require("../js/querys.js")
const key = process.env.JWT_SECRET;

async function Reg_Users(req, res) {
    const { name, email, password, ruolo } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    
    database.query(querys.users.register, [name, email, password, hash_password, ruolo], (error, result) =>{
    // console.log(error);
    // console.log(req.body);
      if (error) {
        switch (error.code) {
            case 'ER_BAD_NULL_ERROR':
            res.status(400).json({msg: "I valori non devono essere vuoti", code: 400});
                break;
        
            case "ER_DUP_ENTRY":
            res.status(400).json({msg: "L'email non devono essere dupplicate", code: 400})
            break;
        }
      } else{
        // console.log(hash_password);
        const object_users = {name: name, email: email, password: hash_password, role: ruolo};
        const token_users = jwt.sign(object_users, key, {expiresIn: "30d"});
        return res.status(200).json({msg: "Registrato con sucesso", code: 200, token: token_users });
      }
    })
}

function Access_Users(req, res) {
    const { email, password } = req.body;

   const cookie_list = req.headers.cookie;
    const cookies = cookie_list.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const token = cookies.Authorization;

    database.query(querys.users.login.query2, [email], (error, result) => {

      if (result.length === 0) return res.status(404).json({msg: "Utente insesistente", code: 404});
      
      const email_users = result[0].email;
      const role_users = result[0].ruolo;
      const name_users = result[0].nome;

      // console.log(result);

      database.query(querys.users.login.query1, [email_users], (error, results) =>{
      if (results.length === 0) return res.status(404).json({msg: "Hash non trovato, Riprova", code: 404});

      const hash_password = results.map(element => element.hashed_key).join("");
      bcrypt.compare(password, hash_password, (error, result) =>{

        if (result) {
          if (token === undefined) {

            const token_gen = jwt.sign({email: email, role: role_users, name: name_users}, key, {expiresIn: "30d"});
            return res.status(200).json({msg: "Accesso con sucesso", code: 200, token: token_gen});

          } else{
            jwt.verify(token, key, (error) =>{
              // console.log(error)
              return res.status(200).json({msg: "Accesso con sucesso", code: 200, role: role_users});
            })
          }
          
        } else{
          return res.status(400).json({msg: "Le password non corrispondo", code: 400});
        }
      });
    })

    })
}

function Cancel_Users(req, res) {
    const { email } = req.body;
    database.query(querys.users.cancel, [email], (error, result) => {
      // console.log(result.affectedRows);
        if (result.affectedRows === 0) return res.status(404).json({msg: "Non Esiste!!", code: 404})
        return res.status(200).json({msg: "Operazione eseguita con successo", code: 200});
    })
}


function Statistic_Admins(req, res) {
  const { email } = req.body;

  database.query(querys.extra.statistic, (error, result) => {
    if (error) return res.status(400).json({msg: "Richiesta non soddisfatta", code: 400})

    database.query(querys.extra.role, [email], (error, results) => {
      const role_users = results.map(element => element.ruolo).join("");
      const id = Number(results.map(element => element.id).join(""));

      if (role_users === "utente") return res.status(400).json({msg: "Devi essere Amministratore, Riprova!!", code: 400})
      
      database.query(querys.extra.events, [id], (error, events) => {

          if (events.length === 0) return res.status(404).json({msg: "Eventi non trovati", code: 404});

          const id_event = events.map(element => element.id);
          const events_elements = [];
          let completed_index = 0;

          id_event.forEach((element, index) => {

            database.query(querys.extra.bookings, [element], (error, list) => {

            events_elements[index] = {...events[index], bookings: list};
            completed_index++;

            if (completed_index === id_event.length) {

             const object_result = {
              prenotazioni: Number(result.map(element => element.totale_prenotazioni).join("")),
              utenti: Number(result.map(element => element.totale_utenti).join("")),
              confermati: Number(result.map(element => element.eventi_confermati).join("")),
              attese: Number(result.map(element => element.eventi_in_attesa).join("")),
            }

            return res.status(200).json({msg: "Le statistiche del server", code: 200, 
            status: object_result,  events: events_elements});  
            }

          })

          });
      })

    })

  })
}

module.exports = {
    Reg_Users,
    Access_Users,
    Cancel_Users,
    Statistic_Admins
}