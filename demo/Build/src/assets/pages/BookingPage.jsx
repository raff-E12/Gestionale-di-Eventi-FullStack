import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../css/BookingPage.css"
import { Booking_Api } from '../contexts/BookingContext'
import { Calendar_Api } from '../contexts/CalendarApi'
import BookingList from './BookingList'

export default function BookingPage() {

  const { isBooking, setBooking, setID, isID, Add_Booking, isState, setState, 
    isOrder, setOrder, isTrue, setTrue, isSubmit, setSubmit, } = Booking_Api();

  const { isEvents, setEvents } = Calendar_Api();

  console.log(isTrue)

  const [isExport, setExport] = useState(false);

  //Set di Stato corrente.
  const handleSetState = (id, value) => { 
    setState((prev) => ({ ...prev, [id]: value }));
    console.log("stato", isState);
  };

  // Creazione di stato di Booking in prenotazione
  const Booking_Sets = () => {
       setOrder((prev) => ({...prev, [isID]: isTrue}));
       setExport(true);
  };

  // Implementaggio di chiamata in funzione
  const byPassFun = () =>{
    if(isID !== null && Object.keys(isState).length !== 0){
        setSubmit(true);
        setTrue(true);
        Booking_Sets();
    }
  }

  // Esportazione in SessionStorage sugli stati dei prenotati
  const Storage_update = () => {
    if (isExport) {
      const session_save = sessionStorage.setItem("events", JSON.stringify(isOrder));
      setExport(false);
      return session_save
    }
  }

  // Disattivazione di prenotazione in base agli eventi prenotati
  const event_Disabled = (index) => {
    if (index in isOrder) {
      return isOrder[index] !== false; // Solo se non è uguale a false può essere disabilitato.
    }
    return true; // Se invece è uguale a true e non a false restituisce il non prenotato.
  };


  useEffect(() => { byPassFun() }, [isID]);
  useEffect(() => { Storage_update() }, [isExport]);

  // Importo Degli stati prenotati.
  useEffect(() => {
    const list_session = JSON.parse(sessionStorage.getItem("events"));
    if (list_session) {
      setOrder(list_session)
    }
  }, [isEvents])

  return (<>
  <div className='booking-sc'>
     <h1>Eventi Disponibili</h1>
    <div class="container">
      {isEvents.length !== 0 ? isEvents.map((element, index) => {

            // const string_date = String(element.start).replace("T", " ").replace("Z", " ").slice(0, 16);
            const list_date = String(element.start).replace("T", " ").replace("Z", " ").split(" ").filter(element => element !== "");
            const date = list_date[0];
            const hours = list_date[1].slice(0, 5);
            const currentStates = isState[element.id];
            const currentEvents = event_Disabled(element.id);

            console.log("evento corrente:", currentEvents)

            return(<>
            <div class={`card ${currentEvents ? "" : "disabled"}`} id={element.id} key={index}>
                <h3>{element.title}</h3>
                <p>{element.description}</p>
                <div class="date">
                    <p><b>Data:</b> {date}</p>
                    <p><b>Ora:</b> {hours}</p>
                </div>
               <div className="flex justify-between w-full">
                  <div className="w-[300px] gap-2 flex flex-row">
                    <button className="btn bg-green-400 disabled:bg-green-700" onClick={() => handleSetState(element.id, true)} disabled={currentStates === true}>Conferma</button>
                    <button className="btn bg-red-500 disabled:bg-red-600" onClick={() => handleSetState(element.id, false)}  disabled={currentStates === false || currentStates === undefined}>in Attesa</button>
                  </div>
                 <button id="btn-pred" onClick={() => setID(element.id)}>Prenota ora</button>
               </div>
            </div>
            </>)
        }) : <div className='w-full h-[120vh]'><p>Lista Vuota :(</p></div>}
    </div>
  </div>
  </>)
}
