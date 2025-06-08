import React from 'react'
import { Calendar_Api } from '../contexts/CalendarApi.jsx'
import "../css/CalendarCss.css"
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from "@fullcalendar/daygrid"
import ListGrid from "@fullcalendar/list"
import interactionPlugin from '@fullcalendar/interaction';
import { computeShrinkWidth } from '@fullcalendar/core/internal';
import { useNavigate } from 'react-router';

export default function CalendarTable() {
  const { isEvents, setEvents, isFilter, Delete_Events, isEnd, setEnd,
    isStart, setStart, idEvents, setIDEvents, isModified, setModified, isDrag, setDrag } = Calendar_Api();

    const navigate = useNavigate();

    console.log(isStart, isEnd, isDrag, isModified);

    // Creazione di aggiornamento valori evento.
    function SetdateDrag(info) {
      const full_date = isStart.split(" ")[0];
      const full_hours = isStart.split(" ")[1];

      const full_date_end = isEnd.split(" ")[0];
      const full_hours_end = isEnd.split(" ")[1];

      const start = {
        day: full_date.split("-")[2],
        mouth: full_date.split("-")[1],
        years: full_date.split("-")[0],
        hours: full_hours.split(":")[0],
        minute: full_hours.split(":")[1],
        milliseconds: String(full_hours.split(":")[2]).padStart(3, "0")
      }
              
      const end = {
        day: full_date_end.split("-")[2],
        mouth: full_date_end.split("-")[1],
        years: full_date_end.split("-")[0],
        hours: full_hours_end.split(":")[0],
        minute: full_hours_end.split(":")[1],
        milliseconds: String(full_hours_end.split(":")[2]).padStart(3, "0")
        }


        const composition_start = [start.years, "-" ,start.mouth, "-" ,start.day, "T", 
        start.hours, ":", start.minute, ".", start.milliseconds, "Z"];

        const composition_end = [end.years, "-" , end.mouth, "-" , end.day, "T", 
        end.hours, ":", end.minute, ".", end.milliseconds, "Z"];

        info.event.setStart(composition_start.join());
        info.event.setEnd(composition_end.join());
    }

  return (
    <>
    <FullCalendar
      plugins={[dayGridPlugin, ListGrid, interactionPlugin]}
      initialView="dayGridMonth"
      events={isFilter}
      editable = {true}
      eventClick={(info) => {return navigate(`/dashboard/events/:${info.event.id}`)}}
      droppable = {true}
      headerToolbar={{left: "prev, next", center: "title", right: "prevYear, nextYear"}}
      eventDrop={(info) => {

        setDrag(true);

        const start_date = {
          id: parseInt(info.event.id.toString()),
          date: info.event.start.getDate().toString().padStart(2, "0"),
          mouth: String(info.event.start.getMonth() + 1).padStart(2, "0"),
          fullyear: info.event.start.getFullYear().toString(),
          hours: info.event.start.getHours().toString().padStart(2, "0"),
          minute: info.event.start.getMinutes().toString().padStart(2, "0"),
          milliseconds: info.event.start.getMilliseconds().toString().padStart(2, "0")
        }

        const end_date = {
          date: info.event.end.getDate().toString().padStart(2, "0"),
          mouth: String(info.event.end.getMonth() + 1).padStart(2, "0"),
          fullyear: info.event.end.getFullYear().toString(),
          hours: info.event.end.getHours().toString().padStart(2, "0"),
          minute: info.event.end.getMinutes().toString().padStart(2, "0"),
          milliseconds: info.event.end.getMilliseconds().toString().padStart(2, "0")
        }

        const extraction_start = [start_date.fullyear, "-" ,start_date.mouth, "-", start_date.date, " ", start_date.hours, ":",
          start_date.minute, ":", start_date.milliseconds].join("");

        const extraction_end = [end_date.fullyear, "-" , end_date.mouth, "-", end_date.date, " ", end_date.hours, ":",
        end_date.minute, ":", end_date.milliseconds].join("");


        setStart(extraction_start);
        setIDEvents(start_date.id);
        setEnd(extraction_end);

        if (isModified) {
          SetdateDrag(info);
          return setModified(false);
        }

      }}
      eventContent={(arg) => (
        <div className='w-[600px] h-auto bg-amber-400 p-3 rounded-2xl 
        border-2 border-amber-700 outline-none flex justify-start items-center gap-[10px]'>
          <div className='w-[70px]'><button className='btn font-bold' onDoubleClick={() =>  Delete_Events(arg.event.id)}>x</button></div>
          <p className='font-bold capitalize text-[1.2em] text-center'>{arg.event.title}</p>
          <p>Inizio: {String(arg.event.start).slice(0, 25)}</p>
        </div>
      )}
    />
    </>
  )
}
