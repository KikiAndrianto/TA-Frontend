import { useState } from 'react'
import {Route, Routes, Link} from 'react-router-dom'
import Navbar from './components/Navbar'
import OrangTua from './Pages/OrangTua'
import Home from './Pages/Home'
import Anak from './Pages/Anak'
import { BrowserRouter } from "react-router-dom";
import Petugas from './Pages/Petugas'
import Footer from './components/Footer'
import Penimbangan from './Pages/Penimbangan'
import EditOrtu from './components/EditOrtu'
import EditPetugas from './components/EditPetugas'
import EditAnak from './components/EditAnak'
import Imunisasi from './Pages/Imunisasi'
import EditPenimbangan from './components/EditPenimbangan'

function App() {

  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/orangtua' element={<OrangTua />}/>
      <Route path='/anak' element={<Anak />}/>
      <Route path='/petugas' element={<Petugas />}/>
      <Route path='/penimbangan' element={<Penimbangan />}/>
      <Route path='/imunisasi' element={<Imunisasi />}/>
      <Route path='orangtua/editOrtu/:id' element={<EditOrtu />}/>
      <Route path='petugas/editPetugas/:id' element={<EditPetugas />}/>
      <Route path='anak/editAnak/:id' element={<EditAnak />}/>
      <Route path='penimbangan/editPenimbangan/:id' element={<EditPenimbangan />}/>
    </Routes>
    {/* <Footer /> */}
    </BrowserRouter>
    </>
  )
}

export default App
