import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Context_Api } from '../contexts/AccountingContext'
import { Link, useNavigate } from "react-router"
import "../css/PopAdv.css"
import Popup from '../components/Popup'

export default function LoginPage() {
  const { isEmail, setEmail, Login_users, isPassword, setPassword, isRule, setRule } = Context_Api();
  return (
    <>
    <main className='main-login'>
        <section class="form-container">
          <h2>Accedi</h2>
          <form id='form' onSubmit={e => Login_users(e.preventDefault())}>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required value={isEmail} onChange={e => setEmail(e.target.value)}/>

            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required value={isPassword} onChange={e => setPassword(e.target.value)}/>
            
            <button type="submit" class="btn">Login</button>
          </form>
          <p>Non hai un account? <Link to={"/user/register"}>Registrati</Link></p>
        </section>
      </main>
    </>
  )
}
