import React, { useState } from 'react'
import "../css/EventsFormData.css"
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Calendar_Api } from '../contexts/CalendarApi'
import { useParams } from 'react-router'

export default function ModifiedEventsPages() {
    const { isEvents, isTitle, setTitle, isDescription,
    setDescription, isStart, setStart, isEnd, setEnd, idEvents, setIDEvents, Upadate_Events} = Calendar_Api();
    const { id } = useParams();

    setIDEvents(parseInt( String(id).split(":")[1]));

    const object = isEvents.filter(element => element.id === idEvents).find(events => events.id === idEvents);
    const title_events = object.title;
    const description_events = object.extendedProps.description;

  return (<>
  <Header />
    <section className='form-section'>
  <form class="form-container" onSubmit={(e) => (Upadate_Events(e.preventDefault()))}>
    <h2>Modifica Evento</h2>

    <div class="form-group">
      <label for="titolo">Titolo</label>
      <input type="text" id="titolo" placeholder={`${title_events}...`} value={isTitle} onChange={(e) => setTitle(e.target.value)} required/>
    </div>

    <div class="form-group">
      <label for="descrizione">Descrizione</label>
      <textarea id="descrizione" placeholder={`${description_events}...`}  value={isDescription} onChange={(e) => setDescription(e.target.value)} required></textarea>
    </div>

    <div class="form-group">
      <label for="inizio">Data e ora di inizio</label>
      <input type="datetime-local" id="inizio" value={isStart} onChange={(e) => setStart(e.target.value)} required/>
    </div>

    <div class="form-group">
      <label for="fine">Data e ora di fine</label>
      <input type="datetime-local" id="fine" name='fine' value={isEnd} onChange={(e) => setEnd(e.target.value)} required/>
    </div>

    <div class="output" id="riepilogo">
      Inserisci i dati per vedere il riepilogo dell’evento.
    </div>

    <button type='submit' className='btn mt-3'>Modifica Ora</button>
  </form>
  </section>
  <Footer />
  </>)
}
