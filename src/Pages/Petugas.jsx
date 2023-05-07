import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import '../App.css'
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../App.css'


const Petugas = () => {
  // Untuk data Petugas
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tugas, setTugas] = useState("");
  const [nohp, setNohp] = useState("");

  const [petugass, setPetugas] = useState([]);

  // Untuk Edit data Petugas
  // const [editNama, setEditNama] = useState("");
  // const [editAlamat, setEditAlamat] = useState("");
  // const [editJabatan, setEditJabatan] = useState("");
  // const [editTugas, setEditTugas] = useState("");
  // const [editNohp, setEditNohp] = useState("");


  const savePetugas = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/petugas', {
          nama,
          alamat,
          jabatan,
          tugas,
          nohp
      });
      getPetugas()
      setNama("")
      setAlamat("")
      setJabatan("")
      setTugas("")
      setNohp("")
  } catch (error) {
      console.log(error);
  }
  }

  useEffect(() => {
    getPetugas();
  },[])

  const getPetugas = () => {
    axios.get('http://localhost:3000/petugas')
     .then((result) => {
        const dataPetugas = result.data
        console.log(result.data);
        setPetugas(dataPetugas.data)
     }).catch((err) => {
        console.log(err);
     });

};

const deletePetugas = async (id) => {
  try {
      await axios.delete(`http://localhost:3000/petugas/${id}`)
      getPetugas();
  } catch (error) {
      console.log(error);
  }
}

  return (
    <>
      <h2 className='judul fw-bolder ms-4'>Form dan Data Petugas</h2>
      <div className='ortu d-flex row container-fluid'>
        <div className='form ms-3 col-md-4'>
          <form onSubmit={savePetugas} >
              <div className="mb-2 mt-3">
              <label  className="form-label">Nama</label>
              <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)}/>
              </div>
              <div className="mb-2">
                  <label className="form-label">Alamat</label>
                  <input type="text" className="form-control" value={alamat} onChange={(e) => setAlamat(e.target.value)}/>
              </div>
              <div className="mb-2">
                  <label className="form-label">Jabatan</label>
                  <input type="text" className="form-control" value={jabatan} onChange={(e) => setJabatan(e.target.value)}/>
              </div><div className="mb-2">
                  <label className="form-label">Tugas</label>
                  <input type="text" className="form-control" value={tugas} onChange={(e) => setTugas(e.target.value)}/>
              </div><div className="mb-2">
                  <label className="form-label">No Hp</label>
                  <input type="text" className="form-control mb-3" value={nohp} onChange={(e) => setNohp(e.target.value)}/>
              </div>
              <button type="submit" onClick={() => {getPetugas()}}  className="btn btn-primary">Submit</button>
          </form>
      </div>

      <div className='col mt-3 ms-3'>
        <div className='bg-light'>
          <label className='mb-1 ' >Tabel Data Petugas</label>
        </div>
        <div className='table-Petugas '>
          <table className="table table-bordered is-striped is-fullwidth border-dark">
            <thead className='kepalaTabel bg-primary'>
                <tr>
                <th className='f-tbl small'>No</th>
                <th className='f-tbl small'>Nama</th>
                <th className='f-tbl small'>Alamat</th>
                <th className='f-tbl small'>Jabatan</th>
                <th className='f-tbl small'>Tugas</th>
                <th className='f-tbl small'>No HP</th>
                <th className='f-tbl small'>Aksi</th>
                </tr>
            </thead>
            <tbody>
              {
                petugass.map((petugas, index) => {
                  return (
                    <tr key={petugas.id}>
                <th className='f-tbl small'>{index + 1}</th>
                <th className='f-tbl small'>{petugas.nama}</th>
                <th className='f-tbl small'>{petugas.alamat}</th>
                <th className='f-tbl small'>{petugas.jabatan}</th>
                <th className='f-tbl small'>{petugas.tugas}</th>
                <th className='f-tbl small'>{petugas.nohp}</th>
                <th className='small'>
                <Link to={`editPetugas/${petugas.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                {/* <button  className='button mt-1 is-small bg-info' data-bs-toggle="modal" data-bs-target="#exampleModal"><AiOutlineEdit /></button> */}
                <button onClick={() => deletePetugas (petugas.id)} className='button text-white mt-1 is-small bg-danger'><RiDeleteBin6Line /></button>
                </th>
              </tr>
                  )
                })
              }
            </tbody>
          </table> 
        </div>
        
      </div>

          {/* <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Data Petugas</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  ...
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div> */}

      </div>
    </>
  )
}

export default Petugas
