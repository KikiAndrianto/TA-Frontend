import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import {Link} from 'react-router-dom'
import axios from 'axios';


const CekHasil = () => {
  const [anaks, setAnaks] = useState([])

  useEffect(() => {
    getAnak();
  },[])

  const getAnak = () => {
    axios.get('http://localhost:3000/anak')
    .then((result) => {
      const dataAnak = result.data
      setAnaks(dataAnak.data)
   }).catch((err) => {
      console.log(err);
   });
  }

  return (
    <>
      <Navbar />
      <h2 className='judul fw-bolder ms-4' data-aos="fade-right" data-aos-duration="800">Halaman Pengecekan Anak </h2>

      <div className='tabel-cek table-responsive'>
      <div className='col mt-3 ms-3' data-aos="fade-left" data-aos-duration="800">
        <label className='mb-1'>Tabel Data Anak</label>
        <div className='tableOrtu'>
          <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='f-tbl small'>No</th>
            <th className='f-tbl small'>Nama</th>
            <th className='f-tbl small'>Nik</th>
            <th className='f-tbl small'>Tempat Lahir</th>
            <th className='f-tbl small'>Tanggal Lahir</th>
            <th className='f-tbl small'>Jenis Kelamin</th>
            <th className='f-tbl small'>Nama Ibu</th>
            <th className='f-tbl small'>Aksi</th>
            </tr>
        </thead>
        <tbody>
          {
            anaks.map((anak, index) => {
              return (
                <tr key={anak.id}>
                  <th className='f-tbl small'>{index + 1}</th>
                  <th className='f-tbl small'>{anak.nama}</th>
                  <th className='f-tbl small'>{anak.nik}</th>
                  <th className='f-tbl small'>{anak.tempatLhr}</th>
                  <th className='f-tbl small'>{anak.tglLahir}</th>
                  <th className='f-tbl small'>{anak.jk}</th>
                  <th className='f-tbl small'>{anak.Ortu.namaIbu}</th>
                  <th className='f-tbl small'>
                  <Link to={`formHasil/${anak.nik}`} className='tombol-edit button is-small bg-primary mr-2 text-decoration-none'>Pilih</Link>
                  </th>
              </tr>
              )
            })
          }
        </tbody>
        </table>
        </div>
      </div>
      </div>
      
    </>
  )
}

export default CekHasil
