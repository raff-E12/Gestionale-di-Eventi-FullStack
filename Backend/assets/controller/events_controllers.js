import database from "../../config.js";
import querys from "../query/querys.js"

function Events_list(req, res) {
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
            description: element.descriptions,
            organizer: element.organizer
            }
          }
          object_tamplate.push(obj);
       }
    })

    return res.status(200).json({events: object_tamplate, code: 200});
    })
}

export {
    Events_list
}