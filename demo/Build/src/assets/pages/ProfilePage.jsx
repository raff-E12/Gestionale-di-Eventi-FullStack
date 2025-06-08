import React from 'react'
import "../css/ProfileMenu.css"
import { Context_Api } from '../contexts/AccountingContext'
import { useNavigate } from 'react-router';
import { Booking_Api } from '../contexts/BookingContext';

export default function ProfilePage() {
  const { Logout_Account, isEmail, isUser, isRule } = Context_Api();
  const navigate = useNavigate();

  return (
    <>
    <div class="container flex-col">

        <div class="section">
            <h2><b>Informazioni Personali</b></h2>
            <p><strong>Nome:</strong> {isUser !== "" ? isUser : <i>Utente Autenticato</i>}</p>
            <p><strong>Email:</strong> {isEmail !== "" ?  isEmail : <i>Email è stata autenticata</i>}</p>
            <p><strong>Ruolo:</strong> {isRule !== "" ? isRule : <i>Ruolo è stata autenticata</i>}</p>
        </div>

        <div class="section">
            <h2><b>Azioni Rapide</b></h2>
            {isRule === "admin" ? <div class="actions">
                <button class="action-btn" onClick={() => Logout_Account()}>Logout</button>
                <button class="action-btn" onClick={() => navigate("/dashboard")}>Eventi Utenti</button>
                <button class="action-btn" onClick={() => navigate("/add-events")}>Aggiungi</button>
                <button class="action-btn" onClick={() => navigate("/booking/admin/list")}>Stato</button>
            </div> : <div class="actions">
                <button class="action-btn" onClick={() => Logout_Account()}>Logout</button>
                <button class="action-btn" onClick={() => navigate("/preview")}>Tutti gli eventi</button>
                <button class="action-btn" onClick={() => navigate("/booking/events")}>Prenota</button>
                <button class="action-btn" onClick={() => navigate("/booking/booked")}>Prenotati</button>
            </div>}
        </div>
    </div>
    </>

  )
}
