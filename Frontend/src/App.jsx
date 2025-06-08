import './App.css'
import { Route, Routes } from "react-router"
import Homepage from './assets/pages/Homepage'

function App() {

  return (
    <>
    <Routes>
      <Route index element={<Homepage />}/>
    </Routes>
    </>
  )
}

export default App
