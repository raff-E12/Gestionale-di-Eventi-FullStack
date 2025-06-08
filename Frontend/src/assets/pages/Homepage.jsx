import React from 'react'
import Header from "../components/General/Header"
import Hero from '../components/General/Hero'

export default function Homepage() {
  return (<>
    <div className='w-full flex items-start justify-start flex-col font-gabarito'>
      <Header />
      <Hero />
    </div>
  </>)
}
