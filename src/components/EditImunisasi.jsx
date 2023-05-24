import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const EditImunisasi = () => {
    const [nama, setNama] = useState("")
    const [tglLahir, setTglLahir] = useState("")
    const [ibu, setIbu] = useState("")
    const [tglImunisasi, setTglImunisasi] = useState(new Date())
    const [jenisVaksin, setJenisVaksin] = useState("")
    const [usia, setUsia] = useState("")
    const [keterangan, setKeterangan] = useState("")


    const [anak, setAnak] = useState([]);
    const [AnakId, setAnakId] = useState("")

    const Navigate = useNavigate();

    const {id} = useParams();

    const updateImunisasi = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/imunisasi/${id}`, {
              AnakId,
              ibu,
              tglImunisasi,
              usia,
              jenisVaksin,
              keterangan
            });
            Navigate("/imunisasi");
            
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAnak();
        getImunisasiById();
      },[])

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

      const getImunisasiById = async () => {
        const response = await axios.get(`http://localhost:3000/imunisasi/${id}`)
        console.log(response);
          setNama(response.data.data.Anak.nama);
          setTglLahir(new Date(response.data.data.Anak.tglLahir));
          setIbu(response.data.data.ibu);
          setTglImunisasi(new Date(response.data.data.tglImunisasi));
          setUsia(response.data.data.usia);
          setJenisVaksin(response.data.data.jenisVaksin);
          setKeterangan(response.data.data.keterangan);
          setAnakId(response.data.data.AnakId)
      }

  return (
    <>
    <Navbar />
      <h2 className='judul-penimbangan fw-bolder ms-4'>Edit Data Imunisasi</h2>

      <div className='contener'>
      <div className='form-penimbangan form ms-3'>
            <form onSubmit={updateImunisasi}>
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
      
    </>
  )
}

export default EditImunisasi
