import React, { useEffect, useState } from 'react'
import "../css/BookingPageAdmin.css"
import { Calendar_Api } from '../contexts/CalendarApi';
import { useNavigate } from 'react-router';

export default function AdminBookingPage() {

  const { isEvents, setEvents, isStatus, setStatus, setList, isList } = Calendar_Api();
  console.log(isStatus)
  console.log(isList)

  const [isBooking, setBooking] = useState(0);
  const [isUsers, setUsers] = useState(0);
  const [isConform, setConform] = useState(0);
  const [isPending, setPending] = useState(0);
  const [isTiming, setTiming] = useState(false);

  const navigate = useNavigate();

  function setIntevels() {
    if (isStatus.length !== 0) {
      return setTiming(true);
    }
  }


  function CountValue() {
    if (isTiming) {
      if (isStatus.prenotazioni || isStatus.utenti || isStatus.prenotazioni || isStatus.confermati || isStatus.attese) {
        const limit_users = isStatus.utenti;
        const limit_booking = isStatus.prenotazioni;
        const limit_conf = isStatus.confermati;
        const limit_att = isStatus.attese;

        let Interval_session = setInterval(() => {

          setBooking((value) => {
            if(value >= limit_booking){
              return value
            }
            return value + 1;
          })

          setUsers((value) => {
            if(value >= limit_users){
              return value
            }
             return value + 1;
          })

         setConform((value) => {
            if(value >= limit_conf){
              return value
            }
             return value + 1;
          })

          setPending((value) => {
            if(value >= limit_att){
              return value
            }
             return value + 1;
          })
        }, 100);

       if (!isTiming) {
         clearInterval(Interval_session);
         setTiming(false);
       }
      }
    }
  }

  useEffect(() => { setIntevels() },[isStatus]);
  useEffect(() => { CountValue() }, [isTiming, isStatus])

  return (<>
   <div className='static-sc'>
    <section class="stats-section">
    <h2>Statistiche Eventi Prenotati</h2>
    <div class="cards-container">
      <div class="card">
        <h3>Totale Prenotazioni</h3>
        <p class="number">{isBooking}</p>
      </div>
      <div class="card">
        <h3>Utenti Unici</h3>
        <p class="number">{isUsers}</p>
      </div>
      <div class="card">
        <h3>Eventi Completati</h3>
        <p class="number">{isConform}</p>
      </div>
      <div class="card">
        <h3>Eventi in Sospeso</h3>
        <p class="number">{isPending}</p>
      </div>
    </div>
  </section>
  {isList.length !== 0 ? <section className='w-full h-auto p-9 d-flex flex-col items-center justify-center gap-2'>
    {isList.map((element, index) => {
        const list_date = String(element.start).replace("T", " ").replace("Z", " ").split(" ").filter(element => element !== "");
        const date = list_date[0];
        const hours = list_date[1].slice(0, 5);
        return(<>
        <div class="card mb-2 gap-3" key={index}>
           <h3>{element.title} <b>#{element.id}</b></h3>
            <div className='date'>
                <p><b>Data:</b> {date}</p>
                <p><b>Ora:</b> {hours}</p>
                <button className='btn bg-amber-400' onClick={() => navigate(`/events/:${element.title}`)}>Scopri</button>
            </div>
        </div>
        </>)
    })}
  </section> : <section className='w-full h-[100vh] p-9 d-flex flex-col items-center justify-center gap-2'>
     <h2 className='capitalize font-bold w-full text-center'>Nessun Evento in lista :(</h2>
    </section>}
   </div>
  </>)
}