import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Email from './components/Email'
import Otpform from './components/Otpform'
import Welcome from "./components/Welcome"
import { Route,  Routes } from 'react-router-dom'
function App() {
  

  return (
    <>
      
            <Routes>
                <Route path="/" element={<Email/>}/>
                <Route path="/otp" element={<Otpform/>}/>
                <Route path="/welcome" element={<Welcome />} />
            </Routes>
        
    </>
  )
}

export default App
