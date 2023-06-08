import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../App.css'
import Navbar from '../components/Navbar'
import AOS from "aos";
import "aos/dist/aos.css";


const Petugas = () => {
  // Untuk data Petugas
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tugas, setTugas] = useState("");
  const [nohp, setNohp] = useState("");

  const [petugass, setPetugas] = useState([]);

  const [cariNama, setCariNama] = useState("")
  const [hasilPetugas, setHasilPetugas] = useState([]); 

  AOS.init();

  const savePetugas = async (e) => {
    e.preventDefault();
    if (nama === "" || alamat === "" || jabatan === "" || tugas === "" || nohp === "") {
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

const handleDeleteAlert = () => {
  swal({
      title: "Sekses",
      text: "Data Berhasil Hapus",
      icon: "success",
    });
}

const cariData = (e) => {
  e.preventDefault();
  if (cariNama.trim() !== '') {
    const hasilPetugas = petugass.filter(
      row =>
        row.nama.toLowerCase().includes(cariNama.toLowerCase())
    );
    setHasilPetugas(hasilPetugas);
  } else {
    setHasilPetugas([]);
  }
  };

  console.log(hasilPetugas);

  return (
    <>
    <Navbar />
      <h2 className='judul fw-bolder ms-4 text-decoration-none' data-aos="fade-right" data-aos-duration="800">Form dan Data Petugas</h2>
      <div className='ortu d-flex row container-fluid'>
        <div className='form ms-3 col-md-4' data-aos="fade-right" data-aos-duration="800">
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
              <button type="submit" onClick={() => getPetugas}  className="btn btn-primary">Submit</button>
          </form>
      </div>

      <div className='col mt-3 ms-3' data-aos="fade-left" data-aos-duration="800">
      <div className='d-flex justify-content-between'>
          <div>
            <label className='mt-2 fw-bold'>Tabel Data Petugas</label>
          </div>
          <div className='d-flex'>
          <input type="text" className=" form-control" placeholder='Cari nama petugas' value={cariNama} onChange={(e) => setCariNama(e.target.value)} />
            <button onClick={cariData} className='btn bg-primary text-white ms-2'>Cari</button>
          </div>
        </div>
        <div className='table-Petugas mt-2'>

        {hasilPetugas.length > 0 ? (
        <table className="table table-bordered is-striped is-fullwidth border-dark" id="table-to-print">
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
                hasilPetugas.map((row, index) => {
                  return (
                    <tr key={row.id}>
                <th className='f-tbl small'>{index + 1}</th>
                <th className='f-tbl small'>{row.nama}</th>
                <th className='f-tbl small'>{row.alamat}</th>
                <th className='f-tbl small'>{row.jabatan}</th>
                <th className='f-tbl small'>{row.tugas}</th>
                <th className='f-tbl small'>{row.nohp}</th>
                <th className='small'>
                  <Link to={`editPetugas/${row.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                  <button onClick={() => {deletePetugas (row.id); handleDeleteAlert(); window.location.reload()}} className='button text-white mt-1 is-small bg-danger'><RiDeleteBin6Line /></button>
                </th>
              </tr>
                  )
                })
              }
            </tbody>
          </table> 

        ) : (
          <table className="table table-bordered is-striped is-fullwidth border-dark" id="table-to-print">
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
                <button onClick={() => {deletePetugas (petugas.id); handleDeleteAlert()}} className='button text-white mt-1 is-small bg-danger'><RiDeleteBin6Line /></button>
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
