import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Outlet } from "react-router"

export default function GeneralLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <Footer />
    </>
  )
}
