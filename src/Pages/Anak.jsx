import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit} from "react-icons/ai";
import {Link} from 'react-router-dom'
import { RiDeleteBin6Line } from "react-icons/ri";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../components/Navbar'
import swal from 'sweetalert'

import AOS from "aos";
import "aos/dist/aos.css";

const Anak = () => {
  // untuk data anak
  const [nama, setNama] = useState("")
  const [nik, setNik] = useState("")
  const [tempatLhr, setTempatLhr] = useState("")
  const [tglLahir, setTglLahir] = useState(new Date())
  const [jk, setJk] = useState("")

  // menampung data anak untuk tabel
  const [anaks, setAnaks] = useState([])

  // untuk select option
  const [options, setOptions] = useState([])
  const [OrtuId, setOrtuId] = useState('')

  const [namaIbu, setNamaIbu] = useState('')
  const [test, settest] = useState('')
  
  AOS.init();

  useEffect(() => {
    getIbu();
    getAnak();
  },[])

  // function save data anak
  const saveAnak = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/anak', {
          nama,
          nik,
          tempatLhr,
          tglLahir,
          jk,
          OrtuId
      });
      getAnak();
      setNama("");
      setNik("");
      setTempatLhr("");
      setTglLahir("");
      setJk("jk");
      setNamaIbu("");
  } catch (error) {
      console.log(error);
  }
  }

  // ambil data anak
  const getAnak = () => {
    axios.get('http://localhost:3000/anak')
    .then((result) => {
      const dataAnak = result.data
      setAnaks(dataAnak.data)
   }).catch((err) => {
      console.log(err);
   });
  }

  // // ambil nama ibu
  const getIbu = () => {
    axios.get('http://localhost:3000/ortu')
    .then((result) => {
      const dataIbu = result.data
      setOptions(dataIbu.data)
   }).catch((err) => {
      console.log(err);
   });
  }

  const deleteAnak = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/anak/${id}`)
        getAnak();
    } catch (error) {
        console.log(error);
    }
}

function handleDateChange(event) {
  setTglLahir(event.target.value)
  // setTglLahir(new Date(data));
  // const tanggalFormatted = dayjs(event.target.value).format('DD-MM-YYYY')
  // setTglLahir(tanggalFormatted)
}

console.log(tglLahir);


const getOrtuById = async () => {
  const response = await axios.get(`http://localhost:3000/ortu/${OrtuId}`)
      setNamaIbu(response.data.data.namaIbu);
  }

  const handleAddAlert = () => {
    swal({
        title: "Sekses",
        text: "Data Berhasil di tambahkan",
        icon: "success",
      });
}

const handleDeleteAlert = () => {
    swal({
        title: "Sekses",
        text: "Data Berhasil Hapus",
        icon: "success",
      });
}
  

  return (
    <>
     <Navbar />
      <h2 className='judul fw-bolder ms-4' data-aos="fade-right" data-aos-duration="800">Form dan Data Anak</h2>
      <div className='ortu d-flex row container-fluid'>

        <div className='form ms-3 col-md-4' data-aos="fade-right" data-aos-duration="800">
          <form onSubmit={saveAnak}>
              <div className="mb-2 mt-3">
              <label  className="form-label">Nama</label>
              <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)} />
              </div>
              <div className="mb-2">
                  <label className="form-label">NIK</label>
                  <input type="text" className="form-control" value={nik} onChange={(e) => setNik(e.target.value)} />
              </div>
              <div className="mb-2">
                  <label className="form-label">Tempat Lahir</label>
                  <input type="text" className="form-control" value={tempatLhr} onChange={(e) => setTempatLhr(e.target.value)}/>
              </div>

              <div>
              <label  className="form-label" >Tanggal Lahir</label>
                <input type="date" className='form-control' format="dd-mm-yyyy" placeholder='masukkan tanggal' value={tglLahir} onChange={handleDateChange}/>
              </div>

               {/* <div className="mb-2">
                <label  className="form-label" >Tanggal Lahir</label>
                  <DatePicker
                dateFormat="dd/MM/yyyy"
                id="date-input"
                selected={tglLahir} onChange={handleDateChange}
                className="form-control"
                placeholderText="Pilih tanggal"
              />
              </div> */}

              <div className="mb-2">
                  <label className="form-label">Jenis Kelamin</label>
                  <select className="form-select mb-2" id="inputJK" value={jk} onChange={(e) => setJk(e.target.value)} name="inputJK">
                    <option>Pilih jenis kelamin</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
              </div><div className="mb-3">
                  <label className="form-label">Nama Ibu</label>

                  <div className='d-flex'>
                    <input type="text" className="form-control" value={namaIbu} onChange={(e) => setNamaIbu(e.target.value)} placeholder='pilih nama ibu'/>
                <button type="button" className="btn btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Pilih</button>
                </div>
              </div>
              <button type="submit" onClick={() => {getAnak(); handleAddAlert()}} className="btn btn-primary">Submit</button>
          </form>
      </div>


      <div className='col mt-3 ms-3' data-aos="fade-left" data-aos-duration="800">
        <label className='mb-1'>Tabel Data Anak</label>
        <div className='tableOrtu'>
          <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='f-tbl small'>No</th>
            <th className='f-tbl small'>Nama</th>
            <th className='f-tbl small'>Nik</th>
            <th className='f-tbl small'>Tempat Lahir</th>
            <th className='f-tbl small'>Tanggal Lahir</th>
            <th className='f-tbl small'>Jenis Kelamin</th>
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
                  <th className='f-tbl small'>{anak.nik}</th>
                  <th className='f-tbl small'>{anak.tempatLhr}</th>
                  <th className='f-tbl small'>{anak.tglLahir}</th>
                  <th className='f-tbl small'>{anak.jk}</th>
                  <th className='f-tbl small'>{anak.Ortu.namaIbu}</th>
                  <th className='f-tbl small'>
                  <Link to={`editAnak/${anak.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                      <button onClick={() => {deleteAnak (anak.id); handleDeleteAlert()}} className='button text-white is-small bg-danger mt-1'><RiDeleteBin6Line /></button>
                  </th>
              </tr>
              )
            })
          }
        </tbody>
        </table>
        </div>
        
      </div>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Edit Data Petugas</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                <table className="table table-bordered is-striped is-fullwidth border-dark">
                    <thead className='kepalaTabel bg-primary' >
                        <tr>
                        <th className='f-tbl small'>No</th>
                        <th className='f-tbl small'>Nama</th>
                        <th className='f-tbl small'>Alamat</th>
                        <th className='f-tbl small'>No Telepon</th>
                        <th className='f-tbl small'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        options.map((ortu, index) => {
                        return (
                            <tr key={ortu.id}>
                            <th className='f-tbl small'>{index + 1}</th>
                            <th className='f-tbl small'>{ortu.namaIbu}</th>
                            <th className='f-tbl small'>{ortu.alamat}</th>
                            <th className='f-tbl small'>{ortu.notlp}</th>
                            <th><button className='btn btn-primary' onFocus={() => setOrtuId(ortu.id)} onClick={getOrtuById} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

      </div>
    </>
  )
}

export default Anak
