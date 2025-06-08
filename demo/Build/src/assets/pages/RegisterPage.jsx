import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import "../css/GeneralDemoStyle.css"
import { Context_Api } from '../contexts/AccountingContext'
import { Link } from "react-router"

export default function RegisterPage() {
  const { isUser, setUser, isEmail, setEmail, isPassword, setPassword, Register_users, isRule, setRule } = Context_Api();
  return (
   <>
    <main className='h-[100vh] flex items-center justify-center'>
    <section class="form-container">
      <h2>Registrati</h2>
      <form id='form' onSubmit={e => Register_users(e.preventDefault())}>

        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required value={isUser} onChange={e => setUser(e.target.value)}/>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required value={isEmail} onChange={e => setEmail(e.target.value)}/>
        
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required value={isPassword} onChange={e => setPassword(e.target.value)}/>

         <label for="role">Ruolo</label>
            <select name="role" id="role" required value={isRule} onChange={(e) => setRule(e.target.value)}>
              <option value="-" selected>-</option>
              <option value="utente">Utente</option>
              <option value="admin">Aministratore</option>
          </select>
        
        <button type="submit" class="btn">Login</button>
      </form>
      
    </section>
  </main>
   </>
  )
}
