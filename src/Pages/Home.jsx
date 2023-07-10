import React from 'react'
import '../App.css'
import Navbar from '../components/Navbar'
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from '../components/Footer';

const Home = () => {


  AOS.init();
  return (
    <>
     <Navbar />
    <div className='home-page' data-aos="fade-right" data-aos-duration="800">
      <div className='d-flex row container-fluid'>
        <div className='col-md-5 ' id='judulhome'>
            <h1>Selamat Datang</h1>
            <h2>Di Sistem Informasi Posyandu Desa Banjarejo</h2>

            <p className='mt-3'>Sebuah sistem informasi yang menyimpan semua data kegiatan Posyandu di desa Banjarejo</p>
            <button className='btn btn-primary shadow home'>Mulai</button>
        </div>
        <div className='col' data-aos="fade-left" data-aos-duration="800">
          <img className='gambar mt-4' src="https://img.freepik.com/free-vector/family-doctor-abstract-concept-vector-illustration-visit-your-doctor-medical-family-practice-primary-healthcare-provider-general-practitioner-physician-service-insurance-abstract-metaphor_335657-1545.jpg?size=626&ext=jpg&ga=GA1.1.1494516282.1662466194&semt=sph"
           alt="" />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
