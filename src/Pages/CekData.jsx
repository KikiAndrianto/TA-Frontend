import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import NavbarIbu from '../components/NavbarIbu'
import AOS from "aos";
import "aos/dist/aos.css";

const CekData = () => {
    const [ortus, setOrtus] = useState([])
    const [anaks, setAnaks] = useState([])

    // untuk ortu
    const [namaIbu, setNamaIbu] = useState('')
    const [namaAyah, setNamaAyah] = useState('')
    const [nikAyah, setNikAyah] = useState('')
    const [noTlp, setNoTlp] = useState('')
    const [alamat, setAlamat] = useState('')
    const [nikIbus, setNikIbus] = useState('')


    const [penimbangan, setPenimbangan] = useState([])
    const [imunisasi, setImunisasi] = useState([])

    const [hasilAnak, setHasilAnak] = useState([]); 
    const [hasilPenimbangan, sethasilPenimbangan] = useState([]);
    const [hasilImunisasi, sethasilImunisasi] = useState([]);

    const nikIbu = localStorage.getItem("userEmail").replace(/["]/g, "");

    AOS.init();

    useEffect(() => {
        getAnak();
        getPenimbangan();
        getImunisasi();
        getOrtuByNikIbu();
      },[])

    const getAnak = () => {
      axios.get(`http://localhost:3000/anak/nikIbu/${nikIbu}`)
      .then((result) => {
        const dataAnak = result.data
        setAnaks(dataAnak.data)
     }).catch((err) => { 
        console.log(err);
     });
    }

    const getOrtuByNikIbu = () => {
      axios.get(`http://localhost:3000/ortu/ByNik/${nikIbu}`)
      .then((result) => {
        const dataOrtu = result.data
        console.log(dataOrtu);
        setOrtus(dataOrtu.data)
        setNamaIbu(dataOrtu.data.namaIbu)
        setNikIbus(dataOrtu.data.nikIbu)
        setNamaAyah(dataOrtu.data.namaAyah)
        setNikAyah(dataOrtu.data.nikAyah)
        setAlamat(dataOrtu.data.alamat)
        setNoTlp(dataOrtu.data.notlp)
     }).catch((err) => { 
        console.log(err);
     });
    }

    console.log(namaIbu);

  
     const getPenimbangan = () => {
        axios.get(`http://localhost:3000/penimbangan/nikIbu/${nikIbu}`)
        .then((result) => {
          const dataPenimbangan = result.data
          setPenimbangan(dataPenimbangan.data)
       }).catch((err) => {
          console.log(err);
       });
      }

      console.log(penimbangan);

      const getImunisasi = () => {
        axios.get(`http://localhost:3000/imunisasi/nikIbu/${nikIbu}`)
        .then((result) => {
          const dataImunisasi = result.data
          setImunisasi(dataImunisasi.data)
       }).catch((err) => {
          console.log(err);
       });
      }
    
    const cariData = (e) => {
        e.preventDefault();
           if (nikIbu.trim() !== '') {
          const hasilAnak = anaks.filter(
            row =>
              row.Ortu.nikIbu.toLowerCase().includes(nikIbu.toLowerCase()) ||
              row.nik.includes(nikIbu)
          );

          const hasilPenimbangan = penimbangan.filter(
            row =>
              row.nikIbu.toLowerCase().includes(nikIbu.toLowerCase())
          );

          const hasilImunisasi = imunisasi.filter(
            row =>
              row.nikIbu.toLowerCase().includes(nikIbu.toLowerCase())
          );
          sethasilPenimbangan(hasilPenimbangan);
          setHasilAnak(hasilAnak);
          sethasilImunisasi(hasilImunisasi)
        } else {
          setHasilAnak([]);
          sethasilPenimbangan([]);
          setImunisasi([]);
        }
        };




  return (
    <>
    <NavbarIbu />
      <h2 className='judul fw-bolder ms-4' data-aos="fade-right" data-aos-duration="800">Cek Data Anak</h2>
    <div className='' data-aos="fade-right" data-aos-duration="800">
       
    </div>
    
    <div className='mt-3 ms-4' data-aos="fade-right" data-aos-duration="800">
        <label className='mb-1 fw-bold'>Tabel Data Anak</label>
        <div className='tabel-cek table-responsive'>
          <table className="table table-bordered table-responsive is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='f-tbl small'>No</th>
            <th className='f-tbl small'>Nama</th>
            <th className='f-tbl small'>Nik</th>
            <th className='f-tbl small'>Tempat Lahir</th>
            <th className='f-tbl small'>Tanggal Lahir</th>
            <th className='f-tbl small'>Jenis Kelamin</th>
            <th className='f-tbl small'>Nama Ibu</th>
            </tr>
        </thead>
        <tbody>
           {
            anaks.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.nama}</td>
                <td>{row.nik}</td>
                <td>{row.tempatLhr}</td>
                <td>{row.tglLahir}</td>
                <td>{row.jk}</td>
                <td>{row.Ortu.namaIbu}</td>
              </tr>
            ))}
        </tbody>
        </table>
        </div>
      </div>
    
      <div className='mt-3 ms-4'>
        <label className='mb-1 fw-bold'>Tabel Data Orang Tua</label>
        <div className='tabel-cek table-responsive'>
          <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='f-tbl small'>No</th>
            <th className='f-tbl small'>Nama Ibu</th>
            <th className='f-tbl small'>Nik Ibu</th>
            <th className='f-tbl small'> Nama Ayah</th>
            <th className='f-tbl small'>Nik Ayah</th>
            <th className='f-tbl small'>Alamat</th>
            <th className='f-tbl small'>No HP</th>
            </tr>
        </thead>
        <tbody>
          <tr>
            <th className='f-tbl small'>1</th>
            <th className='f-tbl small'>{nikIbus}</th>
            <th className='f-tbl small'>{nikIbus}</th>
            <th className='f-tbl small'>{namaAyah}</th>
            <th className='f-tbl small'>{nikAyah}</th>
            <th className='f-tbl small'>{alamat}</th>
            <th className='f-tbl small'>{noTlp}</th>
          </tr>
        </tbody>
        </table>
        </div>
      </div>

      <div className=' mt-3 ms-4'>
        <label className='mb-1 fw-bold'>Tabel Data Penimbangan</label>
        <div className='panjang-tabel tabel-cek table-responsive'>
          <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='f-tbl small'>No</th>
            <th className='f-tbl small'>Nama Anak</th>
            <th className='f-tbl small'>Tanggal Lahir</th>
            <th className='f-tbl small'> Nama Ibu</th>
            <th className='f-tbl small'>Tanggal Penimbangan</th>
            <th className='f-tbl small'>Usia</th>
            <th className='f-tbl small'>Berat Badan(BB)</th>
            <th className='f-tbl small'>Tinggi Badan(BB)</th>
            <th className='f-tbl small'>Lingkar Kepala (LK)</th>
            <th className='f-tbl small'>Keterangan</th>
            </tr>
        </thead>
        <tbody>
          {
            penimbangan.map((penimbangan, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{penimbangan.Anak.nama}</td>
                  <td>{penimbangan.Anak.tglLahir}</td>
                  <td>{penimbangan.ibu}</td>
                  <td>{penimbangan.tglPeriksa}</td>
                  <td>{penimbangan.usia}</td>
                  <td>{penimbangan.bb}</td>
                  <td>{penimbangan.tb}</td>
                  <td>{penimbangan.lk}</td>
                  <td>{penimbangan.keterangan}</td>
                </tr>
              ))}
        </tbody>
        </table>
        </div>  
      </div>

      <div className='mt-3 ms-4'>
        <label className='mb-1 fw-bold'>Tabel Data Imunisasi</label>
        <div className='panjang-tabel tabel-cek table-responsive'>
          <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='f-tbl small'>No</th>
            <th className='f-tbl small'>Nama Anak</th>
            <th className='f-tbl small'>Tanggal Lahir</th>
            <th className='f-tbl small'> Nama Ibu</th>
            <th className='f-tbl small'>Tanggal Imunisasi</th>
            <th className='f-tbl small'>Usia</th>
            <th className='f-tbl small'>Jenis Vaksin</th>
            <th className='f-tbl small'>Keterangan</th>
            </tr>
        </thead>
        <tbody>
          {
            imunisasi.map((imunisasi, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{imunisasi.Anak.nama}</td>
                  <td>{imunisasi.Anak.tglLahir}</td>
                  <td>{imunisasi.ibu}</td>
                  <td>{imunisasi.tglImunisasi}</td>
                  <td>{imunisasi.usia}</td>
                  <td>{imunisasi.jenisVaksin}</td>
                  <td>{imunisasi.keterangan}</td>
                </tr>
              ))
          }
        </tbody>
        </table>
        </div>
        
      </div>

      {/* ) : (
        <p></p>
      )} */}
    </>
  )
}

export default CekData
