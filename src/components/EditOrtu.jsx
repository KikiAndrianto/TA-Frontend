import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const EditOrtu = () => {
    const [namaIbu, setnamaIbu] = useState("");
    const [nikIbu, setnikIbu] = useState("");
    const [namaAyah, setnamaAyah] = useState("");
    const [nikAyah, setnikAyah] = useState("");
    const [alamat, setAlamat] = useState("");
    const [notlp, setNotlp] = useState("");

    const {id} = useParams();

    const Navigate = useNavigate();

    useEffect(() => {
        // getOrtuById();
    },[])  

    const updateOrtu = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:3000/ortu/${id}`, {
                namaIbu,
                nikIbu,
                namaAyah,
                nikAyah,
                alamat,
                notlp,
            });
            Navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    // const getOrtuById = async () => {
    //   await axios.get(`http://localhost:3000/ortu/${id}`)
    //     .then((result) => {
    //         console.log(result.data);
    //         setnamaIbu(result.data.namaIbu);
    //         setnikIbu(result.data.nikIbu);
    //         setnamaAyah(result.data.namaAyah);
    //         setnikAyah(result.data.nikAyah);
    //         setAlamat(result.data.alamat);
    //         setNotlp(result.data.notlp);
    //     }).catch((err) => {
    //         console.log(err);
    //     });
    // }

  return (
    <>
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