import React from 'react'
import { Calendar_Api } from '../contexts/CalendarApi.jsx'
import "../css/CalendarCss.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"
import ListGrid from "@fullcalendar/list"

export default function PreviewCalendar() {
  const { isEvents, setEvents, isFilter } = Calendar_Api();
  return (
    
      <>
    <FullCalendar
      plugins={[dayGridPlugin, ListGrid]}
      initialView="dayGridMonth"
      events={isEvents}
      headerToolbar={{left: "prev, next", center: "title", right: "prevYear, nextYear"}}
      eventContent={(arg) => (
        <div className='w-full h-auto bg-amber-400 p-3 rounded-2xl 
        border-2 border-amber-700 outline-none flex flex-wrap overflow-none'>
           <div className='w-full whitespace-pre-line'>
            <p className='font-bold capitalize text-[1.2em]'>{arg.event.title}</p>
            <p className='font-medium text-sm'>{arg.event.extendedProps.description}.</p>
            <p>Inizio: {String(arg.event.start).slice(0, 25)}</p>
           </div>
        </div>
      )}
    />
    </>
  )
}
