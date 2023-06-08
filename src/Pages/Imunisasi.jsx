import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from '../components/Navbar'
import moment from 'moment';
import swal from 'sweetalert'

const Imunisasi = () => {
  const [cariNama, setCariNama] = useState("")
  const [cariNamaImunisasi, setCariNamaImunisasi] = useState("")
  const [hasilAnak, setHasilAnak] = useState([]);
  const [hasilImunisasi, setHasilImunisasi] = useState([]);
  const [hasilVaksin, setHasilVaksin] = useState([]);

  const [nama, setNama] = useState("")
  const [tglLahir, setTglLahir] = useState("")
  const [ibu, setIbu] = useState("")
  const [tglImunisasi, setTglImunisasi] = useState(new Date())
  const [jenisVaksin, setJenisVaksin] = useState("")
  const [usia, setUsia] = useState("")
  const [keterangan, setKeterangan] = useState("")

  const [imunisasi, setImunisasi] = useState([])

  const [anak, setAnak] = useState([]);
  const [AnakId, setAnakId] = useState("")


  useEffect(() => {
    getAnak();
    getImunisasi();
  },[])

  const saveImunisasi = async (e) => {
    e.preventDefault();
    if (nama === "" || tglLahir === "" || ibu === "" || usia === "" || tglImunisasi === "" 
        || jenisVaksin === "" || keterangan === "") {
          swal({
            icon: "error",
            text: "Data Tidak Boleh Kosong!",
          });
        }else{
          swal({
            text: "Data Berhasil Di Tambahkan",
            icon: "success",
          });

           try {
            await axios.post('http://localhost:3000/imunisasi', {
                AnakId,
                ibu,
                tglImunisasi,
                usia,
                jenisVaksin,
                keterangan
              });
              getImunisasi()
              setNama("")
              setTglLahir("")
              setIbu("")
              setTglImunisasi("")
              setUsia("")
              setJenisVaksin("")
              setKeterangan("")
          } catch (error) {
              console.log(error);
          }
        }
   
  }

  const getAnak = () => {
    axios.get('http://localhost:3000/anak')
    .then((result) => {
      const dataAnak = result.data
      setAnak(dataAnak.data)
   }).catch((err) => {
      console.log(err);
   });
  }

  const getAnakuById = async () => {
    const response = await axios.get(`http://localhost:3000/anak/${AnakId}`)
        setNama(response.data.data.nama);
        setTglLahir(new Date(response.data.data.tglLahir));
        setIbu(response.data.data.Ortu.namaIbu)
  }

  const handlePilih = () => {
    getAnakuById()
    .then(() => {
      cariDataVaksin();
    } ).catch((err) => [
      console.log(err)
    ])
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

  const deleteImunisasi = async (id) => {
    console.log(id);
    try {
        await axios.delete(`http://localhost:3000/imunisasi/${id}`)
        getImunisasi();
        swal({
          text: "Data Berhasil Di Hapus",
          icon: "success",
        })
    } catch (error) {
        console.log(error);
    }
  }

  const cariData = (e) => {
    e.preventDefault();
    if (cariNama.trim() !== '') {
      const hasilAnak = anak.filter(
        row =>
          row.nama.toLowerCase().includes(cariNama.toLowerCase())
      );
      setHasilAnak(hasilAnak);
    } else {
      setHasilAnak([]);
    }
    };

   const handleMouseLeave = () => {
      cariDataVaksin();
      hitungUsia();
    };

    const cariDataVaksin = () => {
      if (nama.trim() !== '') {
        const hasilVaksin = imunisasi.filter(
          row =>
            row.Anak.nama.toLowerCase().includes(nama.toLowerCase())
        );
        setHasilVaksin(hasilVaksin);
      } else {
        setHasilVaksin([]);
      }
      };

      const hitungUsia = () => {
        const date1 = moment(tglLahir);
        const date2 = moment(tglImunisasi);
        const selisihBulan = date2.diff(date1, 'months');
        setUsia(selisihBulan)
      }

      const cariDataImunisasi = (e) => {
        e.preventDefault();
        if (cariNamaImunisasi.trim() !== '') {
          const hasilImunisasi = imunisasi.filter(
            row =>
              row.Anak.nama.toLowerCase().includes(cariNamaImunisasi.toLowerCase())
          );
          setHasilImunisasi(hasilImunisasi);
        } else {
          setHasilImunisasi([]);
        }
        };

  return (
    <>
    <Navbar />
      <h2 className='judul-penimbangan fw-bolder ms-4'>Form dan Data Imunisasi</h2>

      <div className='contener mt-4 d-flex container-fluid'>
          
          <div className='form-penimbangan form ms-3'>
            <form onSubmit={saveImunisasi} >
                <div className="mb-2 mt-3">
                <label  className="form-label">Nama Anak</label>
                <div className='d-flex'>
                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
                <button type="button" onClick={getAnak} className="btn btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Pilih</button>
                </div>
                </div>
                <div className="mb-2">
                <label className="form-label" >Tanggal Lahir</label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        id="date-input"
                        selected={tglLahir}
                        onChange={(data) => setTglLahir(data)}
                        className="form-control"
                        placeholderText="Pilih tanggal"
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label">Nama IBu</label>
                    <input type="text" className="form-control" value={ibu} onChange={(e) => setIbu(e.target.value)}/>
                </div>
                
                <div className="mb-2 mt-4">
                    <label className="form-label" >Tanggal Imunisasi</label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        id="date-input"
                        selected={tglImunisasi}
                        onChange={(data) => setTglImunisasi(data)}
                        className="form-control"
                        placeholderText="Pilih tanggal"
                    />
                </div>
                
                <div className="mb-2">
                    <label className="form-label">Usia (bulan)</label>
                    <div className=''>
                      <input type="text" className="form-control" value={usia} onChange={(e) => setUsia(e.target.value)}/>
                    </div>
                    
                </div>
                <div>

                  <label className='mt-2'> Riwayat Data Vaksin</label>
                  {hasilVaksin.length > 0 ? (
                <table className="mt-2 table table-bordered is-striped is-fullwidth border-dark">
                    <thead className='kepalaTabel bg-primary' >
                        <tr>
                        <th className='f-tbl small'>No</th>
                        <th className='f-tbl small'>Tanggal</th>
                        <th className='f-tbl small'>Jenis Vaksin</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        hasilVaksin.map((row, index) => {
                        return (
                            <tr key={row.id}>
                            <th className='f-tbl small'>{index + 1}</th>
                            <th className='f-tbl small'>{row.tglImunisasi}</th>
                            <th className='f-tbl small'>{row.jenisVaksin}</th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>

                    ) : (
                       <p className='mt-2 text-primary'>Belum Melakukan Vaksinasi</p>
                        )}

                </div>
                
                    <label className="form-label mt-2 mb-2">Imunisasi</label>

                    <div className='d-flex border'>
                      <div className='ms-2 mt-2'>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "HB (0 - 24 jam)"} value="HB (0 - 24 jam)" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              HB (0 - 24 jam)
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "BCG"} value="BCG" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label" >
                              BCG
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "Polio"} value="Polio" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label">
                              Polio
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "DPT-HB-Hib 1"} value="DPT-HB-Hib 1" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label" >
                              DPT-HB-Hib 1
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "Polio 2"} value="Polio 2" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              Polio 2
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "DPT-HB-Hib 2"} value="DPT-HB-Hib 2" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label" >
                            DPT-HB-Hib 2
                            </label>
                          </div>

                        </div>

                      <div className='ms-5 mt-2'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "Polio 3"} value="Polio 3" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              Polio 3
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "DPT-HB-Hib 3"} value="DPT-HB-Hib 3" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label" >
                            DPT-HB-Hib 3
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "Polio 4"} value="Polio 4" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              Polio 4
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "IPV"} value="IPV" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label" >
                              IPV
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" checked={jenisVaksin === "Campak"} value="Campak" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label" >
                              Campak
                            </label>
                          </div>
                      </div>
                    </div>
                
                <div className="mb-3 mt-4">
                    <label className="form-label">Keterangan</label>
                    <input type="text" className="form-control" value={keterangan} onChange={(e) => setKeterangan(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary shadow">Submit</button>
            </form>
         </div>

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
                    <button type='submit' onClick={cariData} className='ms-2 btn btn-primary shadow' >Cari</button>
                  </div>

                  {hasilAnak.length > 0 ? (
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
                        hasilAnak.map((row, index) => {
                        return (
                            <tr key={row.id}>
                            <th className='f-tbl small'>{index + 1}</th>
                            <th className='f-tbl small'>{row.nama}</th>
                            <th className='f-tbl small'>{row.tglLahir}</th>
                            <th className='f-tbl small'>{row.Ortu.namaIbu}</th>
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(row.id)} onClick={getAnakuById} onMouseLeave={handleMouseLeave} data-bs-dismiss="modal">Pilih</button></th>
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
                        anak.map((anak, index) => {
                        return (
                            <tr key={anak.id}>
                            <th className='f-tbl small'>{index + 1}</th>
                            <th className='f-tbl small'>{anak.nama}</th>
                            <th className='f-tbl small'>{anak.tglLahir}</th>
                            <th className='f-tbl small'>{anak.Ortu.namaIbu}</th>
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(anak.id)} onClick={getAnakuById} onMouseLeave={handleMouseLeave} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>
                        )}

                </div>
                </div>
            </div>
            </div>
        </div>

        <div className='tabel-penimbangan mt-2'>
        <div className='d-flex justify-content-between'>
            <div>
              <label className='mt-2 fw-bold'>Tabel Data Imunisasi</label>
            </div>
            <div className='d-flex'>
            <input type="text" className=" form-control" placeholder='Cari nama anak' value={cariNamaImunisasi} onChange={(e) => setCariNamaImunisasi(e.target.value)} />
              <button onClick={cariDataImunisasi} className='btn bg-primary text-white ms-2'>Cari</button>
            </div>
          </div>
            <div className='table-penimbangan mt-2'>

            {hasilImunisasi.length > 0 ? (
      <table className="table table-bordered is-striped is-fullwidth border-dark">
      <thead className='kepalaTabel bg-primary' >
          <tr>
              <th className='f-tbl small'>No</th>
              <th className='f-tbl small'>Nama Anak</th>
              <th className='f-tbl small'>Tanggal Lahir</th>
              <th className='f-tbl small'>Nama Ibu</th>
              <th className='f-tbl small'>Tanggal Imunisasi</th>
              <th className='f-tbl small'>usia</th>
              <th className='f-tbl small'>Jenis Vaksin</th>
              <th className='f-tbl small'>Keterangan</th>
              <th className='f-tbl small'>Action</th>
          </tr>
      </thead>
      <tbody>
          {
              hasilImunisasi.map((row, index) => {
                  return (
                      <tr key={row.id}>
                  <th className='f-tbl small'>{index + 1}</th>
                  <th className='f-tbl small'>{row.Anak.nama}</th>
                  <th className='f-tbl small'>{row.Anak.tglLahir}</th>
                  <th className='f-tbl small'>{row.ibu}</th>
                  <th className='f-tbl small'>{row.tglImunisasi}</th>
                  <th className='f-tbl small'>{row.usia}</th>
                  <th className='f-tbl small'>{row.jenisVaksin}</th>
                  <th className='f-tbl small'>{row.keterangan}</th>
                  <th className='f-tbl small'>
                  <Link to={`editImunisasi/${row.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                  <button onClick={() => {deleteImunisasi(row.id); window.location.reload()}} className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
                  </th>
              </tr>
              )
          })
      }
  </tbody>
  </table>

      ) : (
        <table className="table table-bordered is-striped is-fullwidth border-dark">
            <thead className='kepalaTabel bg-primary' >
                <tr>
                    <th className='f-tbl small'>No</th>
                    <th className='f-tbl small'>Nama Anak</th>
                    <th className='f-tbl small'>Tanggal Lahir</th>
                    <th className='f-tbl small'>Nama Ibu</th>
                    <th className='f-tbl small'>Tanggal Imunisasi</th>
                    <th className='f-tbl small'>usia</th>
                    <th className='f-tbl small'>Jenis Vaksin</th>
                    <th className='f-tbl small'>Keterangan</th>
                    <th className='f-tbl small'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    imunisasi.map((imunisasi, index) => {
                        return (
                            <tr key={imunisasi.id}>
                        <th className='f-tbl small'>{index + 1}</th>
                        <th className='f-tbl small'>{imunisasi.Anak.nama}</th>
                        <th className='f-tbl small'>{imunisasi.Anak.tglLahir}</th>
                        <th className='f-tbl small'>{imunisasi.ibu}</th>
                        <th className='f-tbl small'>{imunisasi.tglImunisasi}</th>
                        <th className='f-tbl small'>{imunisasi.usia}</th>
                        <th className='f-tbl small'>{imunisasi.jenisVaksin}</th>
                        <th className='f-tbl small'>{imunisasi.keterangan}</th>
                        <th className='f-tbl small'>
                        <Link to={`editImunisasi/${imunisasi.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                        <button onClick={() => deleteImunisasi(imunisasi.id)} className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
                        </th>
                    </tr>
                    )
                })
            }
        </tbody>
        </table>
      )}
              
              
        </div>
            
        </div>
    </>
  )
}

export default Imunisasi
