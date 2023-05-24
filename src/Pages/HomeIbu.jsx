import React from 'react'
import "../App.css"
import {Link} from 'react-router-dom'
import NavbarIbu from '../components/NavbarIbu'

const HomeIbu = () => {
  return (
    <>
    <NavbarIbu />
      <div className='home-page'>
      <div className='d-flex row container-fluid'>
        <div className='col-md-5 ' id='judulhome'>
            <h1>Selamat Datang</h1>
            <h2>Di Sistem Informasi Posyandu Desa Banjarejo</h2>

            <p className='mt-3'>Sebuah sistem informasi yang menyimpan semua data kegiatan Posyandu di desa Banjarejo</p>
            <button className='btn btn-primary shadow home'><Link className='text-white text-decoration-none' to={"/data"}>Cek Data</Link> </button>
        </div>
        <div className='col'>
          <img className='gambar mt-4' src="https://img.freepik.com/free-vector/family-doctor-abstract-concept-vector-illustration-visit-your-doctor-medical-family-practice-primary-healthcare-provider-general-practitioner-physician-service-insurance-abstract-metaphor_335657-1545.jpg?size=626&ext=jpg&ga=GA1.1.1494516282.1662466194&semt=sph"
           alt="" />
        </div>
      </div>
    </div>
    </>
  )
}

export default HomeIbu
