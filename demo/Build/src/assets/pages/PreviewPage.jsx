import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Export_Calendar } from '../contexts/CalendarApi'
import PreviewCalendar from '../components/PreviewCalendar'


export default function PreviewPage() {
  return (
    <>
   <Header/>
    <div className='container-mouth'>
    <h2 className='w-full p-10 flex justify-center 
   items-center flex-row font-bold text-2xl'>Tutti gli Eventi</h2>
      <Export_Calendar >
        <PreviewCalendar />
      </Export_Calendar>
    </div>
    <Footer/>
    </>
  )
}
