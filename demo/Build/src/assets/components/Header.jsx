import React from 'react'
import { Link } from "react-router"
import { Context_Api } from '../contexts/AccountingContext'
import { useState } from 'react'

export default function Header() {
  const { isAccess } = Context_Api()
  return (
     <header className="header-sc">
    <div className="container-sc">
      <h1>Gestione Eventi</h1>
      <nav>
        <ul className="flex space-x-6">
          <li><Link to={"/"}>Home</Link></li>
          {!isAccess ?  <li><Link to={"/user/login"}>Accedi</Link></li> : <li><Link to={"/user/profile"}>Profilo</Link></li>}
        </ul>
      </nav>
    </div>
  </header>
  )
}