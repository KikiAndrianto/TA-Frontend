import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';


const EditOrtu = () => {
    const [namaIbu, setnamaIbu] = useState("");
    const [nikIbu, setnikIbu] = useState("");
    const [namaAyah, setnamaAyah] = useState("");
    const [nikAyah, setnikAyah] = useState("");
    const [alamat, setAlamat] = useState("");
    const [notlp, setNotlp] = useState("");

    const [ortu, setOrtu] = useState([])

    const {id} = useParams();

    const Navigate = useNavigate();

    useEffect(() => {
        getOrtuById();
    },[])  

    const updateOrtu = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/ortu/${id}`, {
                namaIbu,
                nikIbu,
                namaAyah,
                nikAyah,
                alamat,
                notlp,
            });
            Navigate("/orangtua");
            
        } catch (error) {
            console.log(error);
        }
    };

    const getOrtuById = async () => {
        const response = await axios.get(`http://localhost:3000/ortu/${id}`)
            setnamaIbu(response.data.data.namaIbu);
            setnikIbu(response.data.data.nikIbu);
            setnamaAyah(response.data.data.namaAyah);
            setnikAyah(response.data.data.nikAyah);
            setAlamat(response.data.data.alamat);
            setNotlp(response.data.data.notlp);
    }
    

  return (
    <>
    <Navbar />
      <h2 className='judul fw-bolder ms-4'>Edit Data Orang Tua</h2>

      <div className='ortu d-flex row container-fluid'>

        <div className='form ms-3 col-md-4'>
            <form onSubmit={updateOrtu} >
                <div className="mb-2 mt-3">
                <label  className="form-label">Nama Ibu</label>
                <input type="text" className="form-control" value={namaIbu} onChange={(e) => setnamaIbu(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label className="form-label">NIK Ibu</label>
                    <input type="text" className="form-control" value={nikIbu} onChange={(e) => setnikIbu(e.target.value)}/>
                </div>
                <div className="mb-2">
                    <label className="form-label">Nama Ayah</label>
                    <input type="text" className="form-control" value={namaAyah} onChange={(e) => setnamaAyah(e.target.value)} />
                </div><div className="mb-2">
                    <label className="form-label">NIK Ayah</label>
                    <input type="text" className="form-control" value={nikAyah} onChange={(e) => setnikAyah(e.target.value)}/>
                </div><div className="mb-2">
                    <label className="form-label">Alamat</label>
                    <input type="text" className="form-control" value={alamat} onChange={(e) => setAlamat(e.target.value)}/>
                </div><div className="mb-3">
                    <label className="form-label">No Hp</label>
                    <input type="text" className="form-control" value={notlp} onChange={(e) => setNotlp(e.target.value)} />
                </div>
                <button type="submit" className='btn ms-2 btn-primary'>Update</button>
                </form>
            </div>

      </div>
    </>
  )
}

export default EditOrtu
