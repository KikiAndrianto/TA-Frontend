import React, { useEffect, useState } from 'react'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import '../App.css'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';

const EditPenimbangan = () => {
    const [nama, setNama] = useState("")
    const [tglLahir, setTglLahir] = useState("")
    const [ibu, setIbu] = useState("")

    const [anak, setAnak] = useState([]);
    const [AnakId, setAnakId] = useState("")

    const [penimbangan, setPenimbangan] = useState([])

    // untuk data penimbangan
    const [tglPeriksa, setTglPeriksa] = useState("")
    const [usia, setUsia] = useState("")
    const [bb, setBeratBadan] = useState("")
    const [tb, setTinggiBadan] = useState("")
    const [lk, setLingkarKepala] = useState("")
    const [keterangan, setKeterangan] = useState("")

    const Navigate = useNavigate();

    const {id} = useParams();

    useEffect(() => {
      getAnak();
      getPenimbanganById();
    },[])

    const updatePenimbangan = async (e) => {
      e.preventDefault();
      try {
          await axios.put(`http://localhost:3000/penimbangan/${id}`, {
            AnakId,
            ibu,
            tglPeriksa,
            usia,
            bb,
            tb,
            lk,
            keterangan
          });
          Navigate("/penimbangan");
          
      } catch (error) {
          console.log(error);
      }
  };

    const getAnak = () => {
      axios.get('http://localhost:3000/anak')
      .then((result) => {
        const dataAnak = result.data
        setAnak(dataAnak.data)
     }).catch((err) => {
        console.log(err);
     });
    }

    const getAnakuById = async () => {
      const response = await axios.get(`http://localhost:3000/anak/${AnakId}`)
          setNama(response.data.data.nama);
          setTglLahir(new Date(response.data.data.tglLahir));
          setIbu(response.data.data.Ortu.namaIbu)
      }

      const getPenimbanganById = async () => {
        const response = await axios.get(`http://localhost:3000/penimbangan/${id}`)
          setNama(response.data.data.Anak.nama);
          setTglLahir(new Date(response.data.data.Anak.tglLahir));
          setIbu(response.data.data.ibu);
          setTglPeriksa(new Date(response.data.data.tglPeriksa));
          setUsia(response.data.data.usia);
          setBeratBadan(response.data.data.bb);
          setTinggiBadan(response.data.data.tb);
          setLingkarKepala(response.data.data.lk);
          setKeterangan(response.data.data.keterangan);
          setAnakId(response.data.data.AnakId)
      }

      function checkStatus(e) {
        e.preventDefault();
        if ( usia == 0) {
          if (bb >= 3.0 && bb <= 4.3 && tb >= 49 && lk >= 33 && lk <= 39) {
            setKeterangan('Sesuai')
          } else if (bb < 3.0 || lk < 33 || tb < 49) {
            setKeterangan('Kurang');
          } else if (bb > 4.3 || lk > 39) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 1) {
          if (bb >= 3.0 && bb <= 4.3 && tb >= 49 && lk >= 33 && lk <= 39) {
            setKeterangan('Sesuai');
          } else if (bb < 3.0 || lk < 33 || tb < 49) {
            setKeterangan('Kurang');
          } else if (bb > 4.3 || lk > 39) {
            setKeterangan('Berlebihan');
          }      
        } else if (usia == 2) {
          if (bb >= 3.6 && bb <= 5.2 && tb >= 52 && lk >= 35 && lk <= 41) {
            setKeterangan('Sesuai')
          } else if (bb < 3.6 || lk < 35 || tb < 52) {
            setKeterangan('Kurang');
          } else if (bb > 5.2 || lk > 41) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 3) {
          if (bb >= 4.2 && bb <= 6.0 && tb >= 55 && lk >= 37 && lk <= 43) {
            setKeterangan('Sesuai')
          } else if (bb < 4.2 || lk < 37 || tb < 55) {
            setKeterangan('Kurang');
          } else if (bb > 6.0 || lk > 43) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 4) {
          if (bb >= 4.7 && bb <= 6.7 && tb >= 57 && lk >= 38 && lk <= 44) {
            setKeterangan('Sesuai')
          } else if (bb < 4.7 || lk < 38 || tb < 57) {
            setKeterangan('Kurang');
          } else if (bb > 6.7 || lk > 44) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 5) {
          if (bb >= 5.3 && bb <= 7.3 && tb >= 59 && lk >= 39 && lk <= 45) {
            setKeterangan('Sesuai')
          } else if (bb < 5.3 || lk < 39 || tb < 59) {
            setKeterangan('Kurang');
          } else if (bb > 7.3 || lk > 45) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 6) {
          if (bb >= 5.8 && bb <= 7.8 && tb >= 61 && lk >= 40 && lk <= 46) {
            setKeterangan('Sesuai')
          } else if (bb < 5.8 || lk < 40 || tb < 61) {
            setKeterangan('Kurang');
          } else if (bb > 7.8 || lk > 46) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 7) {
          if (bb >= 6.2 && bb <= 8.3 && tb >= 63 && lk >= 40.5 && lk <= 46.5) {
            setKeterangan('Sesuai')
          } else if (bb < 6.2 || lk < 40.5 || tb < 63) {
            setKeterangan('Kurang');
          } else if (bb > 8.3 || lk > 46.5) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 8) {
          if (bb >= 6.6 && bb <= 8.8 && tb >= 64.6 && lk >= 41.5 && lk <= 47.5) {
            setKeterangan('Sesuai')
          } else if (bb < 6.6 || lk < 41.5 || tb < 64.6) {
            setKeterangan('Kurang');
          } else if (bb > 8.8 || lk > 47.5) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 9) {
          if (bb >= 7.0 && bb <= 9.2 && tb >= 66 && lk >= 42 && lk <= 48) {
            setKeterangan('Sesuai')
          } else if (bb < 7.0 || lk < 42 || tb < 66) {
            setKeterangan('Kurang');
          } else if (bb > 9.2 || lk > 48) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 10) {
          if (bb >= 7.3 && bb <= 9.5 && tb >= 67.2 && lk >= 42.5 && lk <= 48.5) {
            setKeterangan('Sesuai')
          } else if (bb < 7.3 || lk < 42.5 || tb < 67.2) {
            setKeterangan('Kurang');
          } else if (bb > 9.5 || lk > 48.5) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 11) {
          if (bb >= 7.6 && bb <= 9.9 && tb >= 68.5 && lk >= 43 && lk <= 49) {
            setKeterangan('Sesuai')
          } else if (bb < 7.6 || lk < 43 || tb < 68.5) {
            setKeterangan('Kurang');
          } else if (bb > 9.9 || lk > 49) {
            setKeterangan('Berlebihan');
          }
        } else if (usia == 12) {
          if (bb >= 7.8 && bb <= 10.2 && tb >= 69.6 && lk >= 43.5 && lk <= 49.5) {
            setKeterangan('Sesuai')
          } else if (bb < 7.8 || lk < 43.5 || tb < 69.6) {
            setKeterangan('Kurang');
          } else if (bb > 10.2 || lk > 49.5) {
            setKeterangan('Berlebihan');
          }
        } else if (usia >= 13 && usia <= 18) {
          if (bb >= 8 && bb <= 10.5 && tb >= 70.6 && lk >= 44 && lk <= 50) {
            setKeterangan('Sesuai')
          } else if (bb < 8 || lk < 44 || tb < 70.6) {
            setKeterangan('Kurang');
          } else if (bb > 10.5 || lk > 50) {
            setKeterangan('Berlebihan');
          }
        } else if (usia >= 19 && usia <= 24) {
          if (bb >= 9.0 && bb <= 13.0 && tb >= 79.3 && lk >= 45 && lk <= 51) {
            setKeterangan('Sesuai')
          } else if (bb < 9 || lk < 45 || tb < 79.3) {
            setKeterangan('Kurang');
          } else if (bb > 13 || lk > 51) {
            setKeterangan('Berlebihan');
          }
        }               
        return 'Data tidak valid';
      }


  return (
    <>
    <Navbar />
      <h2 className='judul-penimbangan fw-bolder ms-4'>Edit Data Penimbangan</h2>

      <div className='contener'>
        <div className='form-penimbangan form ms-3'>
            <form onSubmit={updatePenimbangan}>
                <div className="mb-2 mt-3">
                <label  className="form-label">Nama Anak</label>
                <div className='d-flex'>
                    <input type="text" className="form-control" value={nama} onChange={(e) => setNama(e.target.value)}/>
                <button type="button" onClick={getAnak} className="btn btn-primary ms-1" data-bs-toggle="modal" data-bs-target="#exampleModal">Pilih</button>
                </div>
                </div>

                <div className="mb-2">
                    <label className="form-label" >Tanggal Lahir</label>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        id="date-input"
                        selected={tglLahir}
                        onChange={(data) => setTglLahir(data)}
                        className="form-control"
                        placeholderText="Pilih tanggal"
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label" >Nama IBu</label>
                    <input type="text" className="form-control" value={ibu} onChange={(e) => setIbu(e.target.value)}/>
                </div>
                <div className="mb-2 mt-5">
                    <label className="form-label" >Tanggal Lahir</label>
                    <DatePicker
                        dateFormat="yyyy-MM-dd"
                        id="date-input"
                        selected={tglPeriksa}
                        onChange={(data) => setTglPeriksa(data)}
                        className="form-control"
                        placeholderText="Pilih tanggal"
                    />
                </div>
                <div className="mb-2">
                    <label className="form-label">Usia</label>
                    <div className='d-flex'>
                        <input type="text" className="form-control" value={usia} onChange={(e) => setUsia(e.target.value)}/>
                        <label className='ms-1 mt-1'>bulan</label>
                    </div>
                    
                </div><div className="mb-2">
                    <label className="form-label">Berat Badan (BB)</label>
                    <input type="text" className="form-control" value={bb} onChange={(e) => setBeratBadan(e.target.value)}/>
                </div><div className="mb-2">
                    <label className="form-label">Tinggi Badan (TB)</label>
                    <input type="text" className="form-control" value={tb} onChange={(e) => setTinggiBadan(e.target.value)}/>
                </div><div className="mb-2">
                    <label className="form-label">Lingkar Kepala (LK)</label>
                    <input type="text" className="form-control" value={lk} onChange={(e) => setLingkarKepala(e.target.value)}/>
                </div><div className="mb-3">
                    <label className="form-label">Keterangan</label>
                    <div className='d-flex'>
                          <input type="text" className="form-control" value={keterangan} onChange={(e) => setKeterangan(e.target.value)}/>
                    <button className='btn btn-primary ms-2' onClick={checkStatus}>Hasil</button>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary shadow">Update</button>
            </form>
         </div>
      </div>

      

         <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Pilih Data Anak</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">

                <table className="table table-bordered is-striped is-fullwidth border-dark">
                    <thead className='kepalaTabel bg-primary' >
                        <tr>
                        <th className='f-tbl small'>No</th>
                        <th className='f-tbl small'>Nama</th>
                        <th className='f-tbl small'>Tanggal Lahir</th>
                        <th className='f-tbl small'>Nama Ibu</th>
                        <th className='f-tbl small'>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        anak.map((anak, index) => {
                        return (
                            <tr key={anak.id}>
                            <th className='f-tbl small'>{index + 1}</th>
                            <th className='f-tbl small'>{anak.nama}</th>
                            <th className='f-tbl small'>{anak.tglLahir}</th>
                            <th className='f-tbl small'>{anak.Ortu.namaIbu}</th>
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(anak.id)} onClick={getAnakuById} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>


                </div>
                <div className="modal-footer">
                   
                </div>
                </div>
            </div>
            </div>
    </>
  )
}

export default EditPenimbangan
