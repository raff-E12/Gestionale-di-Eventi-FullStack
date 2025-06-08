import React from 'react'
import { Context_Api } from '../contexts/ApiContext'
import "../css/PopAdv.css"
import { useNavigate } from 'react-router'

export default function Popup({set}) {
  const navigate = useNavigate();
  return (
    <>
    {set ? <main className={`main-pop ${set ? "" : "close"}`}> <div id="popup" className={`${set ? "" : "close"}`}>
      <h2>Avviso</h2>
    <p>Registrati per scoprire tutte le funzionalità esclusive!</p>
    <button id="closePopup" onClick={() => navigate("/register")}>Registarti</button>
  </div></main> : <main className={`main-pop ${set ? "close" : ""}`}> <div id="popup" className={`${set ? "close" : ""}`}>
      <h2>Avviso</h2>
    <p>Grazie Mille Per esserti registrato</p>
    <button id="closePopup" onClick={() => navigate("/register")}>Registarti</button>
  </div></main> }
    </>
  )
}
