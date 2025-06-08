import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../css/BookingPage.css"
import { Booking_Api } from '../contexts/BookingContext'
import { Calendar_Api } from '../contexts/CalendarApi'

export default function BookingList() {
   const { isBooking, setBooking } = Booking_Api();

  return (<>
  <div className={`booking-sc`}>
     <h1>Eventi Prenotati</h1>
    <div className={`container`}>

        {isBooking.find(element => element.stato === "confermato") ? <div className='w-full d-flex items-center justify-center mt-6'>
          <h2 className='mb-2 text-green-500'>Eventi Confermati</h2>
            {isBooking.map((element, index) => {
          const list_date = String(element.inizio).replace("T", " ").replace("Z", " ").split(" ").filter(element => element !== "");
          const date = list_date[0];
          const hours = list_date[1].slice(0, 5);

          if (element.stato === "confermato") {
                return(<>
              <div class="card mb-2" key={index}>
                  <h3>{element.evento}</h3>
                  <div  className='date'>
                    <p><b>Data:</b> {date}</p>
                    <p><b>Data:</b> {hours}</p>
                    <p><b>Stato:</b>{element.stato}</p>
                  </div>
              </div>
              </>)
          }
          })}</div> : <div className='w-full d-flex items-center justify-center mt-6'>
            <h2 className='mb-2'>Eventi Confermati</h2>
            <p>Non esistono :(</p>
            </div>}
     
        
        {isBooking.find(element => element.stato === "in attesa") ? <div className='w-full d-flex items-center justify-center mt-6'>
          <h2 className='mb-2 text-red-400'>Eventi in attesa</h2>
          {isBooking.map((element, index) => {
          const list_date = String(element.inizio).replace("T", " ").replace("Z", " ").split(" ").filter(element => element !== "");
          const date = list_date[0];
          const hours = list_date[1].slice(0, 5);

        if (element.stato === "in attesa") {
              return(<>
            <div class="card mb-2" key={index}>
                <h3>{element.evento}</h3>
                <div  className='date'>
                  <p><b>Data:</b> {date}</p>
                  <p><b>Data:</b> {hours}</p>
                  <p><b>Stato:</b>{element.stato}</p>
                </div>
            </div>
            </>)
        }
        })}</div> : <div className='w-full d-flex items-center justify-center mt-6 h-[100vh]'>
          <h2 className='mb-2'>Eventi in Attesa</h2>
          <p>Non esistono :(</p>
          </div>}

    </div>
  </div>
  </>)
}
