import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Anak = () => {
  // untuk data anak
  const [nama, setNama] = useState("")
  const [nik, setNik] = useState("")
  const [tempatLhr, setTempatLhr] = useState("")
  const [tglLahir, setTglLahir] = useState("")
  const [jk, setJk] = useState("")

  // menampung data anak untuk tabel
  const [anaks, setAnaks] = useState([])

  // untuk select option
  const [options, setOptions] = useState([])
  const [OrtuId, setOrtuId] = useState('')

  // console.log(OrtuId);

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


  return (
    <>
      <h2 className='judul fw-bolder ms-4'>Form dan Data Anak</h2>
      <div className='ortu d-flex row container-fluid'>

        <div className='form ms-3 col-md-4'>
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

              <div className="mb-2">
                <label  className="form-label" >Tanggal Lahir</label>
                  <DatePicker
                id="date-input"
                selected={tglLahir} onChange={(data) => setTglLahir(data)}
                className="form-control"
                placeholderText="Pilih tanggal"
              />
              </div>

              <div className="mb-2">
                  <label className="form-label">Jenis Kelamin</label>
                  <select className="form-select mb-2" id="inputJK" value={jk} onChange={(e) => setJk(e.target.value)} name="inputJK">
                    <option>Pilih jenis kelamin</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
              </div><div className="mb-3">
                  <label className="form-label">Nama Ibu</label>
                  <select className="form-select mb-2" value={OrtuId} onChange={(e) => setOrtuId(e.target.value)} name="inputJK">
                    {options.map((ortu) => {
                      return (
                        <option value={ortu.id} key={ortu.id} title={ortu.id}>{ortu.namaIbu}</option>
                      )
                    })}
                  </select>
              </div>
              <button type="submit" onClick={() => {getAnak()}} className="btn btn-primary">Submit</button>
              <button type='submit' className='btn ms-2 btn-primary'>Update</button>
          </form>
      </div>


      <div className='tableOrtu col mt-3 ms-3'>
        <label className='mb-1'>Tabel Data Anak</label>
        <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='small'>No</th>
            <th className='small'>Nama</th>
            <th className='is-small'>Nik</th>
            <th className='small'>Tempat Lahir</th>
            <th className='small'>Tanggal Lahir</th>
            <th className='small'>Jenis Kelamin</th>
            <th className='small'>Nama Ibu</th>
            <th className='small'>Aksi</th>
            </tr>
        </thead>
        <tbody>
          {
            anaks.map((anak, index) => {
              return (
                <tr key={anak.id}>
                  <th className='small'>{index + 1}</th>
                  <th className='small'>{anak.nama}</th>
                  <th className='small'>{anak.nik}</th>
                  <th className='small'>{anak.tempatLhr}</th>
                  <th className='small'>{anak.tglLahir}</th>
                  <th className='small'>{anak.jk}</th>
                  <th className='small'>{anak.Ortu.namaIbu}</th>
                  <th className='small'>
                      <button className='button is-small is-info mr-2 bg-success'><AiOutlineEdit /></button>
                      <button onClick={() => deleteAnak (anak.id)} className='button is-small bg-danger mt-1'><RiDeleteBin6Line /></button>
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

export default Anak
