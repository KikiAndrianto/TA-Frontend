import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const EditAnak = () => {
  const [nama, setNama] = useState("")
  const [nik, setNik] = useState("")
  const [tempatLhr, setTempatLhr] = useState("")
  const [tglLahir, setTglLahir] = useState(new Date())
  const [jk, setJk] = useState("")

  const Navigate = useNavigate();

  // untuk select option
  const [options, setOptions] = useState([])
  const [OrtuId, setOrtuId] = useState('')

  const [namaIbu, setNamaIbu] = useState('')

  const {id} = useParams();

  console.log(nama);

  useEffect(() => {
    getIbu();
    getAnakById();
  },[])

  const updateAnak = async (e) => {
    e.preventDefault();
    console.log("test");
    try {
        await axios.put(`http://localhost:3000/anak/${id}`, {
          nama,
          nik,
          tempatLhr,
          tglLahir,
          jk,
          OrtuId
        });
        Navigate("/anak");
    } catch (error) {
        console.log(error);
    }
};

  const getIbu = () => {
    axios.get('http://localhost:3000/ortu')
    .then((result) => {
      const dataIbu = result.data
      setOptions(dataIbu.data)
   }).catch((err) => {
      console.log(err);
   });
  }

  const getAnakById = async () => {
    const response = await axios.get(`http://localhost:3000/anak/${id}`)
    setNama(response.data.data.nama);
    setNik(response.data.data.nik);
    setTempatLhr(response.data.data.tempatLhr);
    setTglLahir(new Date(response.data.data.tglLahir));
    setJk(response.data.data.jk);
    setNamaIbu(response.data.data.Ortu.namaIbu);
    setOrtuId(response.data.data.OrtuId)
}

const getOrtuById = async () => {
  const response = await axios.get(`http://localhost:3000/ortu/${OrtuId}`)
      setNamaIbu(response.data.data.namaIbu);
  }

  function handleDateChange(date) {
    setTglLahir(date);
    console.log(tglLahir);
    const formattedDate = format(date, 'dd/MM/yyyy');
    console.log(formattedDate); // output: 2023-05-01
  }



  return (
    <>
       <h2 className='judul fw-bolder ms-4'>Edit Data Anak</h2>

       <div className='ortu d-flex row container-fluid'>

       <div className='form ms-3 col-md-4'>
          <form onSubmit={updateAnak}>
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
                    selected={tglLahir} onChange={handleDateChange}
                    id="date-input"
                    className="form-control"
                    placeholderText="Pilih tanggal"
                    dateFormat="dd/MM/yyyy"
                  />
              </div>

              <div className="mb-2">
                  <label className="form-label">Jenis Kelamin</label>
                  <select className="form-select mb-2" id="inputJK" value={jk} onChange={(e) => setJk(e.target.value)} name="inputJK">
                    <option>Pilih jenis kelamin</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
              </div>
              
              <div className="mb-3">
                <label className="form-label">Nama Ibu</label>
                  <div className='d-flex'>
                    <input type="text" className="form-control" value={namaIbu} onChange={(e) => setNamaIbu(e.target.value)}/>
                    <button type="button" className="btn btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Pilih</button>
                 </div>
              </div>
              <button type='submit' className='btn ms-2 btn-primary'>Update</button>
          </form>
      </div>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">Pilih Nama Ibu</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">

                <table className="table table-bordered is-striped is-fullwidth border-dark">
                    <thead className='kepalaTabel bg-primary' >
                        <tr>
                        <th className='small'>No</th>
                        <th className='small'>Nama</th>
                        <th className='small'>Alamat</th>
                        <th className='small'>No Telepon</th>
                        <th className='small'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        options.map((ortu, index) => {
                        return (
                            <tr key={ortu.id}>
                            <th className='small'>{index + 1}</th>
                            <th className='small'>{ortu.namaIbu}</th>
                            <th className='small'>{ortu.alamat}</th>
                            <th className='small'>{ortu.notlp}</th>
                            <th><button className='btn btn-primary' onFocus={() => setOrtuId(ortu.id)} onClick={getOrtuById} data-bs-dismiss="modal">Pilih</button></th>
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
    </>
  )
}

export default EditAnak
