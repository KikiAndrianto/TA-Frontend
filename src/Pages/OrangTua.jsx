import React, { useState, useEffect } from 'react'
import '../App.css'
import {useNavigate, Link} from 'react-router-dom'
import axios from 'axios'
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import Navbar from '../components/Navbar'
import swal from 'sweetalert'
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from '../components/Footer';


const OrangTua = () => {
    const Navigate = useNavigate();
    const [cariNama, setCariNama] = useState("")
    const [hasilOrtu, setHasilOrtu] = useState([]); 

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

    AOS.init();

    const saveOrtu = async (e) => {
      e.preventDefault();
      if (namaIbu === "" || namaAyah === "" || nikIbu === "" || nikAyah === "" || alamat === "" || notlp === "") {
        swal({
          icon: "error",
          text: "Data Tidak Boleh Kosong!",
        });
      } else if (nikIbu.length !== 16 || nikAyah.length !== 16) {
        swal({
          icon: "error",
          text: "NIK harus berjumlah 16 angka",
        });
      } else{
        swal({
          text: "Data Berhasil Di Tambahkan",
          icon: "success",
        });

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

    const cariData = (e) => {
        e.preventDefault();
        if (cariNama.trim() !== '') {
          const hasilOrtu = ortus.filter(
            row =>
              row.namaIbu.toLowerCase().includes(cariNama.toLowerCase())
          );
          setHasilOrtu(hasilOrtu);
        } else {
          setHasilOrtu([]);
        }
        };

  return (
    <>
    <Navbar />
        <h2 className='judul fw-bolder ms-4' data-aos="fade-right" data-aos-duration="800">Form dan Data Orang Tua</h2>
    <div className='ortu d-flex row container-fluid'>
        
        <div className='form ms-3 col-md-4' data-aos="fade-right" data-aos-duration="800">
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
            <button type="submit" onClick={() => getOrtu} className="btn btn-primary">Submit</button>
            
        </form>
    </div>

{/* tabel */}
    <div className=' table-responsive col mt-3 ms-3' data-aos="fade-left" data-aos-duration="800">
    <div className='d-flex justify-content-between'>
          <div>
            <label className='mt-2 fw-bold'>Tabel Data Orang Tua</label>
          </div>
          <div className='d-flex'>
          <input type="text" className=" form-control" placeholder='Cari nama ibu' value={cariNama} onChange={(e) => setCariNama(e.target.value)} />
            <button onClick={cariData} className='btn bg-primary text-white ms-2'>Cari</button>
          </div>
        </div>
        <div className='tableOrtu mt-2'>

        {hasilOrtu.length > 0 ? (
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
                    hasilOrtu.map((row, index) => {
                        return (
                            <tr key={row.id}>
                        <th className='f-tbl small'>{index + 1}</th>
                        <th className='f-tbl small'>{row.namaIbu}</th>
                        <th className='f-tbl small'>{row.nikIbu}</th>
                        <th className='f-tbl small'>{row.namaAyah}</th>
                        <th className='f-tbl small'>{row.nikAyah}</th>
                        <th className='f-tbl small'>{row.alamat}</th>
                        <th className='f-tbl small'>{row.notlp}</th>
                        <th className='f-tbl small'>
                        <Link to={`editOrtu/${row.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                         <button onClick={() => {deleteOrtu (row.id); handleDeleteAlert(); window.location.reload()}} className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
                     </th>
                 </tr>
                 )
             })
         }
     </tbody>
     </table>

      ) : (
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
                    
                            <button onClick={() => {deleteOrtu (ortu.id); handleDeleteAlert()}} className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
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
    </div>
    {/* <Footer /> */}
    </>
    
  )
}

export default OrangTua
