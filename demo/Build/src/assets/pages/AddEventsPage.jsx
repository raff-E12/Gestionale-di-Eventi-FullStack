import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../css/FormAdd.css"
import { Calendar_Api } from '../contexts/CalendarApi'

export default function AddEventsPage() {
    const { isTitle, setTitle, isDescription, 
        setDescription, isStart, setStart, isEnd, 
        setEnd, Add_Calendar_Users } = Calendar_Api();

  return (
    <>
    <Header />
    <div className='container-form'>
        <div className="form-container">
        <h1>Aggiungi Evento</h1>
        <form onSubmit={(e) => Add_Calendar_Users(e.preventDefault())}>

            <div class="form-group">
                <label for="title">Titolo:</label>
                <input type="text" id="title" name="title" placeholder="Inserisci il titolo dell'evento" value={isTitle} required onChange={e => setTitle(e.target.value)}/>
            </div>

            <div class="form-group">
                <label for="description">Descrizione:</label>
                <textarea id="description" name="description" placeholder="Descrivi l'evento" required value={isDescription} onChange={e => setDescription(e.target.value)}></textarea>
            </div>

            <div class="form-group">
                <label for="start">Inizio Evento:</label>
                <input type="datetime-local" id="start" name="start" required value={isStart} onChange={e => setStart(e.target.value)}/>
            </div>

            <div class="form-group">
                <label for="end">Fine Evento:</label>
                <input type="datetime-local" id="end" name="end" required value={isEnd} onChange={e => setEnd(e.target.value)}/>
            </div>

            <button type="submit" class="submit-btn">Aggiungi Evento</button>
        </form>
    </div>
    </div>
    <Footer />
    </>
  )
}
