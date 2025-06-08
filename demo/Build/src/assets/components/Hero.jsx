import React from 'react'
import { Context_Api } from '../contexts/AccountingContext'
import { Link } from 'react-router';

export default function Hero() {
  const { isAccess } = Context_Api();
  return (
    <section className="hero-sc">
    <div className="container-sc">
      <h2>Organizza e Gestisci i tuoi Eventi</h2>
      <p>Benvenuto nel sistema di gestione eventi. Accedi per creare, prenotare e gestire eventi facilmente!</p>
       {!isAccess ? <Link to={"/user/login"} className="btns">Accedi</Link> : <Link to={"/user/profile"} className="btns">Vai alla Dashboard</Link>}
    </div>
  </section>

  )
}
