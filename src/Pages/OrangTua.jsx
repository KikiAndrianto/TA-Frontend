import React, { useState, useEffect } from 'react'
import '../App.css'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";


const OrangTua = () => {
    // untuk form
    const [namaIbu, setnamaIbu] = useState("");
    const [nikIbu, setnikIbu] = useState("");
    const [namaAyah, setnamaAyah] = useState("");
    const [nikAyah, setnikAyah] = useState("");
    const [alamat, setAlamat] = useState("");
    const [notlp, setNotlp] = useState("");

    // untuk tabel
    const [ortus, setOrtus] = useState([]);
    const [ortu, setOrtu] = useState([]);

    // menampung id dari button edit
    const [id, setId] = useState();


    const saveOrtu = async (e) => {
      e.preventDefault();
      try {
        await axios.post('http://localhost:3000/ortu', {
            namaIbu,
            nikIbu,
            namaAyah,
            nikAyah,
            alamat,
            notlp
        });
        getOrtu()
        setnamaIbu("")
        setnikIbu("")
        setnamaAyah("")
        setnikAyah("")
        setAlamat("")
        setNotlp("")
    } catch (error) {
        console.log(error);
    }
    }
    
// Untuk Tabel
    useEffect(() => {
        getOrtu();
    },[])

    const getOrtu = () => {
        axios.get('http://localhost:3000/ortu')
         .then((result) => {
            const dataOrtu = result.data
            console.log(result.data);
            setOrtus(dataOrtu.data)
         }).catch((err) => {
            console.log(err);
         });
    
    };

    // hapus data 
    const deleteOrtu = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/ortu/${id}`)
            getOrtu();
        } catch (error) {
            console.log(error);
        }
    }

    //untuk ambil data ortu byID
    // const getOrtuById = async () => {
    //     axios.get(`http://localhost:3000/ortu/${id}`)
    //     .then((result) => {
    //         setOrtu(result.data)
    //         setnamaIbu(ortu.data.namaIbu);
    //         setnikIbu(ortu.data.nikIbu);
    //         setnamaAyah(ortu.data.namaAyah);
    //         setnikAyah(ortu.data.nikAyah);
    //         setAlamat(ortu.data.alamat);
    //         setNotlp(ortu.data.notlp);
    //     }).catch((err) => {
    //         console.log(err);
    //     });       
    // }
    
    
  return (
    <>
        <h2 className='judul fw-bolder ms-4'>Form dan Data Orang Tua</h2>
    <div className='ortu d-flex row container-fluid'>
        
        <div className='form ms-3 col-md-4'>
        <form onSubmit={saveOrtu}>
            <div className="mb-2 mt-3">
            <label  className="form-label">Nama Ibu</label>
            <input type="text" className="form-control"  value={namaIbu} onChange={(e) => setnamaIbu(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label className="form-label">NIK Ibu</label>
                <input type="text" className="form-control" value={nikIbu} onChange={(e) => setnikIbu(e.target.value)}/>
            </div>
            <div className="mb-2">
                <label className="form-label">Nama Ayah</label>
                <input type="text" className="form-control" value={namaAyah} onChange={(e) => setnamaAyah(e.target.value)}/>
            </div><div className="mb-2">
                <label className="form-label">NIK Ayah</label>
                <input type="text" className="form-control" value={nikAyah} onChange={(e) => setnikAyah(e.target.value)}/>
            </div><div className="mb-2">
                <label className="form-label">Alamat</label>
                <input type="text" className="form-control" value={alamat} onChange={(e) => setAlamat(e.target.value)}/>
            </div><div className="mb-3">
                <label className="form-label">No Hp</label>
                <input type="text" className="form-control" value={notlp} onChange={(e) => setNotlp(e.target.value)}/>
            </div>
            <button type="submit" onClick={() => {getOrtu()}} className="btn btn-primary">Submit</button>
            
        </form>
    </div>

{/* tabel */}
    <div className=' table-responsive col mt-3 ms-3'>
        <label className='mb-1'>Tabel Data Anak</label>
        <div className='tableOrtu'>
            <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='f-tbl small'>No</th>
            <th className='f-tbl small'>Nama Ibu</th>
            <th className='f-tbl small'>Nik Ibu</th>
            <th className='f-tbl small'>Nama Ayah</th>
            <th className='f-tbl small'>Nik Ayah</th>
            <th className='f-tbl small'>Alamat</th>
            <th className='f-tbl small'>No Hp</th>
            <th className='f-tbl small'>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                ortus.map((ortu, index) => {
                    return (
                        <tr key={ortu.id}>
                    <th className='f-tbl small'>{index + 1}</th>
                    <th className='f-tbl small'>{ortu.namaIbu}</th>
                    <th className='f-tbl small'>{ortu.nikIbu}</th>
                    <th className='f-tbl small'>{ortu.namaAyah}</th>
                    <th className='f-tbl small'>{ortu.nikAyah}</th>
                    <th className='f-tbl small'>{ortu.alamat}</th>
                    <th className='f-tbl small'>{ortu.notlp}</th>
                    <th className='f-tbl small'>
                    <Link to={`editOrtu/${ortu.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                    
                            <button onClick={() => deleteOrtu (ortu.id)} className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
                        </th>
                    </tr>
                    )
                })
            }
        </tbody>
        </table>
        </div>
        
    </div>
        
    </div>
    
    
    </>
    
  )
}

export default OrangTua
