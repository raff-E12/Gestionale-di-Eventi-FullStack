import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../css/ListEventsBookings.css"
import { useParams } from 'react-router'
import { Calendar_Api } from '../contexts/CalendarApi'

export default function BookingsEventsList() {
  const { name } = useParams();
  const { setList, isList } = Calendar_Api();
  console.log(name)
  const title_events = name.replace(":", "");

  return (<>
  <Header />
    <div className='event-view'>
        <div class="container">
           {isList.map((element) => {
                if (element.title === title_events) {
                const list_date = String(element.start).replace("T", " ").replace("Z", " ").split(" ").filter(element => element !== "");
                const date = list_date[0];
                const hours = list_date[1].slice(0, 5);
                return(<>
                <h1><b>Evento:</b> {element.title}</h1>

                <div class="event-details">
                <p><strong>Data:</strong>{date}</p>
                <p><strong>Ora:</strong>{hours}</p>
                <p><strong>Descrizione:</strong>{element.description}</p>
                </div>

                {element.bookings.length !== 0 ? <div className='w-full'><h2>Persone Prenotate</h2>
                <ul class="attendees">
                  {element.bookings.map((bookings) => { return( <li>{bookings.utente}</li> )})}
                </ul>
                </div> : <div className='w-full'><h2>Nessuno si è prenotato</h2></div>}
            </>)}
            })}
        </div>
    </div>
 <Footer />
  </>)
}