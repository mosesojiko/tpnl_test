
import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Layout from './pages/Layout'
import ProfilePage from './pages/ProfilePage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}></Route>
          <Route index element={<Home />} />
          <Route path ="get-selected-user-details/:id" element={<ProfilePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}


export default App
   
    

   
      
        
