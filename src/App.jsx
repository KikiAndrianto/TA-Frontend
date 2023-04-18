import { useState } from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import Navbar from './components/Navbar'
import OrangTua from './Pages/OrangTua'
import Home from './Pages/Home'
import Anak from './Pages/Anak'
import Petugas from './Pages/Petugas'
import Footer from './components/Footer'
import Penimbangan from './Pages/Penimbangan'
import EditOrtu from './components/EditOrtu'

function App() {

  return (
    <>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/orangtua' element={<OrangTua />}/>
      <Route path='/anak' element={<Anak />}/>
      <Route path='/petugas' element={<Petugas />}/>
      <Route path='/penimbangan' element={<Penimbangan />}/>
      <Route path='orangtua/editOrtu/:id' element={<EditOrtu />}/>
    </Routes>
    {/* <Footer /> */}
    </>
  )
}

export default App
