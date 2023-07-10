import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from '../components/Navbar'


const AdminCekData = () => {
  const [cariNama, setCariNama] = useState("")
  const [hasilAnakCari, setHasilAnakCari] = useState([]);

  const [anakCari, setAnakCari] = useState([]);
  const [AnakId, setAnakId] = useState([]);

  const [cariNik, setCariNik] = useState("")
    const [anaks, setAnaks] = useState([])

    const [penimbangan, setPenimbangan] = useState([])
    const [imunisasi, setImunisasi] = useState([])

    const [hasilAnak, setHasilAnak] = useState([]); 
    const [hasilPenimbangan, sethasilPenimbangan] = useState([]);
    const [hasilImunisasi, sethasilImunisasi] = useState([]);
     const [nama, setNama] = useState("")

    AOS.init();

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

    // console.log(AnakId);
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

      const getAnakById = async () => {
        const response = await axios.get(`http://localhost:3000/anak/${AnakId}`)
            setCariNik(response.data.data.nik);
            setNama(response.data.data.nama)
      }
    
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

        const cariDataAnak = (e) => {
          e.preventDefault();
          if (cariNama.trim() !== '') {
            const hasilAnakCari = anaks.filter(
              row =>
                row.nama.toLowerCase().includes(cariNama.toLowerCase())
            );
            setHasilAnakCari(hasilAnakCari);
          } else {
            setHasilAnakCari([]);
          }
          };

          // const CariAnak = (e) => {
          //   e.preventDefault();
          //   if (cariNama.trim() !== '') {
          //     const hasilAnakCari = anakCari.filter(
          //       row =>
          //         row.nama.toLowerCase().includes(cariNama.toLowerCase())
          //     );
          //     setHasilAnakCari(hasilAnakCari);
          //   } else {
          //     setHasilAnakCari([]);
          //   }
          //   };

  return (
    <>
    <Navbar />
    <h2 className='judul fw-bolder ms-4' data-aos="fade-right" data-aos-duration="800">Cari Data Anak</h2>
  <div className='' data-aos="fade-right" data-aos-duration="800">
      <form>
        <div className='form-cek mt-3'>
          <label  className="form-label">Untuk mengecek data Masukkan NIK anak</label>
          <div className='d-flex'>
            <input type="text" className="form-control" placeholder='Pilih Anak' value={nama} onChange={(e) => setCariNama(e.target.value)}/>
           <button onClick={cariDataAnak} className='btn btn-primary shadow ms-2' data-bs-toggle="modal" data-bs-target="#exampleModal">Pilih</button>
          </div>
          </div>
      </form>
  </div>

  {hasilAnak.length > 0 ? (
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
        <p className='ms-4' data-aos="fade-right" data-aos-duration="800">Data Tidak Di Temukan</p>
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

          <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Pilih Data Anak</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='carinama d-flex'>
                    <input type="text" className=" form-control" placeholder='Cari nama anak' value={cariNama} onChange={(e) => setCariNama(e.target.value)} />
                    <button type='submit' onClick={cariDataAnak}  className='ms-2 btn btn-primary shadow' >Cari</button>
                  </div>
                
                  {hasilAnakCari.length > 0 ? (
                <table className="mt-2 table table-bordered is-striped is-fullwidth border-dark">
                    <thead className='kepalaTabel bg-primary' >
                        <tr>
                        <th className='f-tbl small'>No</th>
                        <th className='f-tbl small'>Nama</th>
                        <th className='f-tbl small'>Tanggal Lahir</th>
                        <th className='f-tbl small'>Nama Ibu</th>
                        <th className='f-tbl small'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        hasilAnakCari.map((row, index) => {
                        return (
                            <tr key={row.id}>
                            <th className='f-tbl small'>{index + 1}</th>
                            <th className='f-tbl small'>{row.nama}</th>
                            <th className='f-tbl small'>{row.tglLahir}</th>
                            <th className='f-tbl small'>{row.Ortu.namaIbu}</th>
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(row.id)} onClick={getAnakById} onMouseLeave={cariData} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>

                    ) : (

                        <table className="mt-2 table table-bordered is-striped is-fullwidth border-dark">
                    <thead className='kepalaTabel bg-primary' >
                        <tr>
                        <th className='f-tbl small'>No</th>
                        <th className='f-tbl small'>Nama</th>
                        <th className='f-tbl small'>Tanggal Lahir</th>
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
                            <th className='f-tbl small'>{anak.tglLahir}</th>
                            <th className='f-tbl small'>{anak.Ortu.namaIbu}</th>
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(anak.id)} onClick={getAnakById} onMouseLeave={cariData} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>
                        )}

                </div>
                <div className="modal-footer"> 
                </div>
                </div>
            </div>
            </div>
  </>
)
}

export default AdminCekData
