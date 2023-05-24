import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../App.css'
import Navbar from '../components/Navbar';


const Penimbangan = () => {
    // untuk data anak
    const [nama, setNama] = useState("")
    const [tglLahir, setTglLahir] = useState("")
    const [ibu, setIbu] = useState("")

    const [anak, setAnak] = useState([]);
    const [AnakId, setAnakId] = useState("")

    const [penimbangan, setPenimbangan] = useState([])

    // untuk data penimbangan
    const [tglPeriksa, setTglPeriksa] = useState(new Date())
    const [usia, setUsia] = useState("")
    const [bb, setBeratBadan] = useState("")
    const [tb, setTinggiBadan] = useState("")
    const [lk, setLingkarKepala] = useState("")
    const [keterangan, setKeterangan] = useState("")
    

    useEffect(() => {
        getAnak();
        getPenimbangan();
      },[])

      const savePenimbangan = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3000/penimbangan', {
            AnakId,
            ibu,
            tglPeriksa,
            usia,
            bb,
            tb,
            lk,
            keterangan
          });
          getPenimbangan()
          setNama("")
          setTglLahir("")
          setIbu("")
          setTglPeriksa("")
          setUsia("")
          setBeratBadan("")
          setTinggiBadan("")
          setLingkarKepala("")
          setKeterangan("")
      } catch (error) {
          console.log(error);
      }
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

      console.log(penimbangan);

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
        console.log(response);
            setNama(response.data.data.nama);
            setTglLahir(new Date(response.data.data.tglLahir));
            setIbu(response.data.data.Ortu.namaIbu)
        }

        const deletePenimbangan = async (id) => {
            try {
                await axios.delete(`http://localhost:3000/penimbangan/${id}`)
                getPenimbangan();
            } catch (error) {
                console.log(error);
            }
          }

  
  return (
    <>
    <Navbar />
        <h2 className='judul-penimbangan fw-bolder ms-4'>Form dan Data Penimbangan</h2>

        <div className='contener d-flex container-fluid'>
          
          <div className='form-penimbangan form ms-3'>
            <form onSubmit={savePenimbangan}>
                <div className="mb-2 mt-3">
                <label  className="form-label">Nama Anak</label>
                <div className='d-flex'>
                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)}/>
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
                    <label className="form-label" >Nama IBu</label>
                    <input type="text" className="form-control" value={ibu} onChange={(e) => setIbu(e.target.value)}/>
                </div>
                <div className="mb-2 mt-5">
                    <label className="form-label" >Tanggal Penimbangan</label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
                        id="date-input"
                        selected={tglPeriksa}
                        onChange={(data) => setTglPeriksa(data)}
                        className="form-control"
                        placeholderText="Pilih tanggal"
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label">Usia</label>
                    <div className='d-flex'>
                        <input type="text" className="form-control" value={usia} onChange={(e) => setUsia(e.target.value)}/>
                        <label className='ms-1 mt-1'>bulan</label>
                    </div>
                    
                </div><div className="mb-2">
                    <label className="form-label">Berat Badan (BB)</label>
                    <input type="text" className="form-control" value={bb} onChange={(e) => setBeratBadan(e.target.value)}/>
                </div><div className="mb-2">
                    <label className="form-label">Tinggi Badan (TB)</label>
                    <input type="text" className="form-control" value={tb} onChange={(e) => setTinggiBadan(e.target.value)}/>
                </div><div className="mb-2">
                    <label className="form-label">Lingkar Kepala (LK)</label>
                    <input type="text" className="form-control" value={lk} onChange={(e) => setLingkarKepala(e.target.value)}/>
                </div><div className="mb-3">
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
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(anak.id)} onClick={getAnakuById} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>
                </div>
                <div className="modal-footer">
                   
                </div>
                </div>
            </div>
            </div>
        </div>


        <div className='tabel-penimbangan mt-3'>
            <label className='mb-1'>Tabel Data Penimbangan</label>
            <div className='table-penimbangan'>
                <table className="table table-bordered is-striped is-fullwidth border-dark">
            <thead className='kepalaTabel bg-primary' >
                <tr>
                    <th className='f-tbl small'>No</th>
                    <th className='f-tbl small'>Nama Anak</th>
                    <th className='f-tbl small'>Tanggal Lahir</th>
                    <th className='f-tbl small'>Nama Ibu</th>
                    <th className='f-tbl small'>Tanggal Penimbangan</th>
                    <th className='f-tbl small'>usia (bulan)</th>
                    <th className='f-tbl small'>Berat Badan</th>
                    <th className='f-tbl small'>Tinggi Badan</th>
                    <th className='f-tbl small'>Lingkar Kepala</th>
                    <th className='f-tbl small'>Keterangan</th>
                    <th className='f-tbl small'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    penimbangan.map((penimbangan, index) => {
                        return (
                            <tr key={penimbangan.id}>
                        <th className='f-tbl small'>{index + 1}</th>
                        <th className='f-tbl small'>{penimbangan.Anak.nama}</th>
                        <th className='f-tbl small'>{penimbangan.Anak.tglLahir}</th>
                        <th className='f-tbl small'>{penimbangan.ibu}</th>
                        <th className='f-tbl small'>{penimbangan.tglPeriksa}</th>
                        <th className='f-tbl small'>{penimbangan.usia}</th>
                        <th className='f-tbl small'>{penimbangan.bb} kg</th>
                        <th className='f-tbl small'>{penimbangan.tb} cm</th>
                        <th className='f-tbl small'>{penimbangan.lk} cm</th>
                        <th className='f-tbl small'>{penimbangan.keterangan}</th>
                        <th className='f-tbl small'>
                        <Link to={`editPenimbangan/${penimbangan.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                        
                                <button onClick={() => deletePenimbangan(penimbangan.id) } className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
                            </th>
                        </tr>
                        )
                    })
                }
            </tbody>
            </table>
            </div>
            
        </div>

    </>
  )
}

export default Penimbangan
