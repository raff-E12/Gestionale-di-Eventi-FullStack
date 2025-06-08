import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Export_Calendar } from '../contexts/CalendarApi'
import CalendarTable from '../components/CalendarTable'

export default function Dashboard() {
  return (
    <>
    <Header/>
    <div className='container-mouth'>
      <Export_Calendar >
        <CalendarTable />
      </Export_Calendar>
    </div>
    <Footer/>
    </>
  )
}
