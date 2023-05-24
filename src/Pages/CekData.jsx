import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavbarIbu from '../components/NavbarIbu'

const CekData = () => {
    const [cariNik, setCariNik] = useState("")
    const [anaks, setAnaks] = useState([])

    const [penimbangan, setPenimbangan] = useState([])
    const [imunisasi, setImunisasi] = useState([])

    const [hasilAnak, setHasilAnak] = useState([]);
    const [hasilPenimbangan, sethasilPenimbangan] = useState([]);
    const [hasilImunisasi, sethasilImunisasi] = useState([]);

    useEffect(() => {
        getAnak();
        getPenimbangan();
        getImunisasi();
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

     const getPenimbangan = () => {
        axios.get('http://localhost:3000/penimbangan')
        .then((result) => {
          const dataPenimbangan = result.data
          setPenimbangan(dataPenimbangan.data)
       }).catch((err) => {
          console.log(err);
       });
      }

      const getImunisasi = () => {
        axios.get('http://localhost:3000/imunisasi')
        .then((result) => {
          const dataImunisasi = result.data
          setImunisasi(dataImunisasi.data)
       }).catch((err) => {
          console.log(err);
       });
      }

      console.log(imunisasi);
    
    const cariData = (e) => {
        e.preventDefault();
        if (cariNik.trim() !== '') {
          const hasilAnak = anaks.filter(
            row =>
              row.nama.toLowerCase().includes(cariNik.toLowerCase()) ||
              row.nik.includes(cariNik)
          );

          const hasilPenimbangan = penimbangan.filter(
            row =>
              row.Anak.nik.toLowerCase().includes(cariNik.toLowerCase())
          );

          const hasilImunisasi = imunisasi.filter(
            row =>
              row.Anak.nik.toLowerCase().includes(cariNik.toLowerCase())
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
      <h2 className='judul fw-bolder ms-4'>Cek Data Anak</h2>
    <div className=''>
        <form>
          <div className='form-cek mt-3'>
            <label  className="form-label">Untuk mengecek data Masukkan NIK anak</label>
            <input type="text" className="form-control" placeholder='Masukkan NIK' value={cariNik} onChange={(e) => setCariNik(e.target.value)}/>
            <button onClick={cariData} className='btn btn-primary shadow mt-2'>Cek</button>
            </div>
        </form>
    </div>
    {hasilAnak.length > 0 ? (
    <div className='mt-3 ms-4'>
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
           {hasilAnak.map((row, index) => (
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
       ) : (
        <p></p>
      )}

{hasilAnak.length > 0 ? (
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
          {hasilAnak.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.Ortu.namaIbu}</td>
                  <td>{row.Ortu.nikIbu}</td>
                  <td>{row.Ortu.namaAyah}</td>
                  <td>{row.Ortu.nikAyah}</td>
                  <td>{row.Ortu.alamat}</td>
                  <td>{row.Ortu.notlp}</td>
                </tr>
              ))}
        </tbody>
        </table>
        </div>
        
      </div>

      ) : (
        <p className='ms-4'>Data Tidak Di Temukan</p>
      )}


    {hasilPenimbangan.length > 0 ? (
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
          {hasilPenimbangan.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.Anak.nama}</td>
                  <td>{row.Anak.tglLahir}</td>
                  <td>{row.ibu}</td>
                  <td>{row.tglPeriksa}</td>
                  <td>{row.usia}</td>
                  <td>{row.bb}</td>
                  <td>{row.tb}</td>
                  <td>{row.lk}</td>
                  <td>{row.keterangan}</td>
                </tr>
              ))}
        </tbody>
        </table>
        </div>
        
      </div>

      ) : (
        <p></p>
      )}

{hasilImunisasi.length > 0 ? (
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
          {hasilImunisasi.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.Anak.nama}</td>
                  <td>{row.Anak.tglLahir}</td>
                  <td>{row.ibu}</td>
                  <td>{row.tglImunisasi}</td>
                  <td>{row.usia}</td>
                  <td>{row.jenisVaksin}</td>
                  <td>{row.keterangan}</td>
                </tr>
              ))}
        </tbody>
        </table>
        </div>
        
      </div>

      ) : (
        <p></p>
      )}
    </>
  )
}

export default CekData
