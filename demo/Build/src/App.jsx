import './App.css'
import Header from './assets/components/Header'
import Hero from "./assets/components/Hero"
import Main from "./assets/components/Main"
import Footer from "./assets/components/Footer"
import { BrowserRouter, Route, Routes } from "react-router"
import IndexPages from './assets/pages/IndexPages'
import RegisterPage from './assets/pages/RegisterPage'
import { ApiContext } from './assets/contexts/AccountingContext'
import LoginPage from './assets/pages/LoginPage'
import Dashboard from './assets/pages/Dashboard'
import GeneralLayout from "./assets/layout/GeneralLayout"
import ProfilePage from './assets/pages/ProfilePage'
import PreviewPage from "./assets/pages/PreviewPage"
import AddEventsPage from './assets/pages/AddEventsPage'
import { Export_Calendar } from './assets/contexts/CalendarApi'
import { Export_Booking } from './assets/contexts/BookingContext'
import BookingPage from './assets/pages/BookingPage'
import BookingList from './assets/pages/BookingList'
import AdminBookingPage from './assets/pages/AdminBookingPage'
import BookingsEventsList from './assets/pages/BookingsEventsList'
import ModifiedEventsPages from './assets/pages/ModifiedEventsPages'

function App() {

  return (
    <>
    <ApiContext>
        <Export_Calendar>
          <Export_Booking>
              <Routes>
                <Route index element={<IndexPages />}/>

                <Route path='/user' element={<GeneralLayout />}>
                  <Route path='register' element={<RegisterPage />} />
                  <Route path='login' element={<LoginPage />} />
                  <Route path='profile' element={<ProfilePage />} />
                </Route>

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/preview' element={<PreviewPage />} />
                <Route path='/add-events' element={<AddEventsPage />} />
                <Route path='/events/:name' element={<BookingsEventsList />} />
                <Route path='/dashboard/events/:id' element={<ModifiedEventsPages />}/>

                <Route path='/booking' element={<GeneralLayout/>} >
                 <Route path='events' element={<BookingPage />} />
                 <Route path='booked' element={<BookingList />} />
                 <Route path='admin/list' element={<AdminBookingPage />} />
                </Route>
              </Routes>
          </Export_Booking>
        </Export_Calendar>
    </ApiContext>
    </>
  )
}

export default App
