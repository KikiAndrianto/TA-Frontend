import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const Imunisasi = () => {
  const [nama, setNama] = useState("")
  const [tglLahir, setTglLahir] = useState("")
  const [ibu, setIbu] = useState("")
  const [tglImunisasi, setTglImunisasi] = useState("")
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
    try {
      await axios.post('http://localhost:3000/imunisasi', {
        AnakId,
        tglImunisasi,
        usia,
        jenisVaksin,
        keterangan
      });
      getImunisasi()
  } catch (error) {
      console.log(error);
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
        setTglLahir(response.data.data.tglLahir)
        setIbu(response.data.data.Ortu.namaIbu)
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
    } catch (error) {
        console.log(error);
    }
  }

  return (
    <>
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
                    <label className="form-label">Tanggal Lahir</label>
                    <input type="text" className="form-control" value={tglLahir} onChange={(e) => setTglLahir(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label className="form-label">Nama IBu</label>
                    <input type="text" className="form-control" value={ibu} onChange={(e) => setIbu(e.target.value)}/>
                </div>
                
                <div className="mb-2 mt-5">
                    <label className="form-label" >Tanggal Lahir</label>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        id="date-input"
                        selected={tglImunisasi}
                        onChange={(data) => setTglImunisasi(data)}
                        className="form-control"
                        placeholderText="Pilih tanggal"
                    />
                </div>
                
                <div className="mb-2">
                    <label className="form-label">Usia</label>
                    <input type="text" className="form-control" value={usia} onChange={(e) => setUsia(e.target.value)}/>
                </div>

                    <label className="form-label mt-3 mb-2">Imunisasi</label>

                    <div className='d-flex border'>
                      <div className='ms-2 mt-2'>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="HB (0 - 24 jam)" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              HB (0 - 24 jam)
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="BCG" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label" >
                              BCG
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Polio" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label">
                              Polio
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="DPT-HB-Hib 1" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label" >
                              DPT-HB-Hib 1
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Polio 2" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              Polio 2
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="DPT-HB-Hib 2" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label" >
                            DPT-HB-Hib 2
                            </label>
                          </div>

                        </div>

                      <div className='ms-5 mt-2'>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Polio 3" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              Polio 3
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="DPT-HB-Hib 3" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label" >
                            DPT-HB-Hib 3
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Polio 4" id="flexCheckDefault" onChange={(e) => setJenisVaksin(e.target.value)}/>
                            <label className="form-check-label">
                              Polio 4
                            </label>
                          </div>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="IPV" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
                            <label className="form-check-label" >
                              IPV
                            </label>
                          </div>

                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="Campak" id="flexCheckChecked" onChange={(e) => setJenisVaksin(e.target.value)} />
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

                <table className="table table-bordered is-striped is-fullwidth border-dark">
                    <thead className='kepalaTabel bg-primary' >
                        <tr>
                        <th className='small'>No</th>
                        <th className='small'>Nama</th>
                        <th className='small'>Tanggal Lahir</th>
                        <th className='small'>Nama Ibu</th>
                        <th className='small'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        anak.map((anak, index) => {
                        return (
                            <tr key={anak.id}>
                            <th className='small'>{index + 1}</th>
                            <th className='small'>{anak.nama}</th>
                            <th className='small'>{anak.tglLahir}</th>
                            <th className='small'>{anak.Ortu.namaIbu}</th>
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(anak.id)} onClick={getAnakuById} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div className='tabel-penimbangan'>
            <label className='mb-1'>Tabel Data Penimbangan</label>
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
                        <th className='f-tbl small'>test</th>
                        <th className='f-tbl small'>{imunisasi.tglImunisasi}</th>
                        <th className='f-tbl small'>{imunisasi.usia}</th>
                        <th className='f-tbl small'>{imunisasi.jenisVaksin}</th>
                        <th className='f-tbl small'>{imunisasi.keterangan}</th>
                        <th className='f-tbl small'>
                        {/* <Link to={`editOrtu/${ortu.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link> */}
                        
                                <button onClick={() => deleteImunisasi(imunisasi.id)} className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
                            </th>
                        </tr>
                        )
                    })
                }
            </tbody>
            </table>
        </div>
    </>
  )
}

export default Imunisasi
