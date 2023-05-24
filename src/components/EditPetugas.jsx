import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const EditPetugas = () => {
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tugas, setTugas] = useState("");
  const [nohp, setNohp] = useState("");

  const {id} = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
      getPetugasById();
  },[])

  const updatePetugas = async (e) => {
      e.preventDefault();
      try {
          await axios.put(`http://localhost:3000/petugas/${id}`, {
              nama,
              alamat,
              jabatan,
              tugas,
              nohp,
          });
          Navigate("/petugas");
      } catch (error) {
          console.log(error);
      }
  };

  const getPetugasById = async () => {
    const response = await axios.get(`http://localhost:3000/petugas/${id}`)
    console.log(response);
    setNama(response.data.data.nama);
    setAlamat(response.data.data.alamat);
    setJabatan(response.data.data.jabatan);
    setTugas(response.data.data.tugas);
    setNohp(response.data.data.nohp);
  }


  return (
    <>
    <Navbar />
      <h2 className='judul fw-bolder ms-4'>Edit Data Petugas</h2>

      <div className='ortu d-flex row container-fluid'>

      <div className='form ms-3 col-md-4'>
          <form onSubmit={updatePetugas} >
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
              <button  className='btn ms-2 btn-primary'>Update</button>
          </form>
      </div>
        
      </div>
    </>
  )
}

export default EditPetugas
