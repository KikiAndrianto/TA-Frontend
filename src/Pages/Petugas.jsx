import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../App.css'
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";


const Petugas = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tugas, setTugas] = useState("");
  const [nohp, setNohp] = useState("");

  const [petugass, setPetugas] = useState([]);


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
  } catch (error) {
      console.log(error);
  }
  }

  useEffect(() => {
    getPetugas();
  })

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
              <button  className='btn ms-2 btn-primary'>Update</button>
          </form>
      </div>

      <div className='tableOrtu col mt-3 ms-3'>
        <label className='mb-1'>Tabel Data Petugas</label>
        <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary'>
            <tr>
            <th className='small'>No</th>
            <th className='small'>Nama</th>
            <th className='is-small'>Alamat</th>
            <th className='small'>Jabatan</th>
            <th className='small'>Tugas</th>
            <th className='small'>No HP</th>
            <th className='small'>Action</th>
            </tr>
        </thead>
        <tbody>
          {
            petugass.map((petugas, index) => {
              return (
                <tr>
            <th>{index + 1}</th>
            <th>{petugas.nama}</th>
            <th>{petugas.alamat}</th>
            <th>{petugas.jabatan}</th>
            <th>{petugas.tugas}</th>
            <th>{petugas.nohp}</th>
            <th className='small'>
                <button className='button is-small is-info mr-2 bg-success'><AiOutlineEdit /></button>
                <button onClick={() => deletePetugas (petugas.id)} className='button mt-1 is-small bg-danger'><RiDeleteBin6Line /></button>
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

export default Petugas
