import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import '../App.css'
import Navbar from '../components/Navbar';
import moment from 'moment';
import swal from 'sweetalert'


const Penimbangan = () => {
    const [cariNama, setCariNama] = useState("")
  const [hasilAnak, setHasilAnak] = useState([]);
  
  const [cariNamaPenimbangan, setCariNamaPenimbangan] = useState("")
  const [hasilPenimbangan, setHasilPenimbangan] = useState([]); 
    // untuk data anak
    const [nama, setNama] = useState("")
    const [tglLahir, setTglLahir] = useState("")
    const [ibu, setIbu] = useState("")

    const [anak, setAnak] = useState([]);
    const [AnakId, setAnakId] = useState("")

    const [penimbangan, setPenimbangan] = useState([])

    // untuk data penimbangan
    const [tglPeriksa, setTglPeriksa] = useState(new Date())
    const [usia, setUsia] = useState("")
    const [bb, setBeratBadan] = useState("")
    const [tb, setTinggiBadan] = useState("")
    const [lk, setLingkarKepala] = useState("")
    const [keterangan, setKeterangan] = useState("")
    

    useEffect(() => {
        getAnak();
        getPenimbangan();
      },[])

      const savePenimbangan = async (e) => {
        e.preventDefault();
        if (nama === "" || tglLahir === "" || ibu === "" || usia === "" || tglPeriksa === "" 
        || bb === "" || tb === "" || lk === "" || keterangan === "") {
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
              await axios.post('http://localhost:3000/penimbangan', {
                AnakId,
                ibu,
                tglPeriksa,
                usia,
                bb,
                tb,
                lk,
                keterangan
              });
              getPenimbangan()
              setNama("")
              setTglLahir("")
              setIbu("")
              setTglPeriksa("")
              setUsia("")
              setBeratBadan("")
              setTinggiBadan("")
              setLingkarKepala("")
              setKeterangan("")
          } catch (error) {
              console.log(error);
          }
        }
       
      }

      const getPenimbangan = () => {
        axios.get('http://localhost:3000/penimbangan')
        .then((result) => {
          const dataPenimbangan = result.data
          setPenimbangan(dataPenimbangan.data)
       }).catch((err) => {
          console.log(err);
       });
      }

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
        console.log(response);
            setNama(response.data.data.nama);
            setTglLahir(new Date(response.data.data.tglLahir));
            setIbu(response.data.data.Ortu.namaIbu)
        }

        const deletePenimbangan = async (id) => {
            try {
                await axios.delete(`http://localhost:3000/penimbangan/${id}`)
                getPenimbangan();
                swal({
                  text: "Data Berhasil Di Hapus",
                  icon: "success",
                })
            } catch (error) {
                console.log(error);
            }
          }

          const cariData = (e) => {
            e.preventDefault();
            if (cariNama.trim() !== '') {
              const hasilAnak = anak.filter(
                row =>
                  row.nama.toLowerCase().includes(cariNama.toLowerCase())
              );
              setHasilAnak(hasilAnak);
            } else {
              setHasilAnak([]);
            }
            };

            function checkStatus(e) {
              e.preventDefault();
              if ( usia === 0) {
                if (bb >= 3.0 && bb <= 4.3 && tb >= 49 && tb <= 54 && lk >= 33 && lk <= 39) {
                  setKeterangan('Sesuai')
                } else if (bb < 3.0 || lk < 33) {
                  setKeterangan('Kurang');
                } else if (bb > 4.3 || lk > 39) {
                  setKeterangan('Berlebihan');
                }
              } else if ( usia === 1) {
                if (bb >= 3.0 && bb <= 4.3 && tb >= 49 && tb <= 54 && lk >= 33 && lk <= 39) {
                  setKeterangan('Sesuai')
                } else if (bb < 3.0 || lk < 33) {
                  setKeterangan('Kurang');
                } else if (bb > 4.3 || lk > 39) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 2) {
                if (bb >= 3.6 && bb <= 5.2 && tb >= 52 && tb <= 58 && lk >= 35 && lk <= 41) {
                  setKeterangan('Sesuai')
                } else if (bb < 3.6 || lk < 35) {
                  setKeterangan('Kurang');
                } else if (bb > 5.2 || lk > 41) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 3) {
                if (bb >= 4.2 && bb <= 6.0 && tb >= 55 && tb <= 61 && lk >= 37 && lk <= 43) {
                  setKeterangan('Sesuai')
                } else if (bb < 4.2 || lk < 55) {
                  setKeterangan('Kurang');
                } else if (bb > 6.0 || lk > 43) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 4) {
                if (bb >= 4.7 && bb <= 6.7 && tb >= 57 && tb <= 63 && lk >= 38 && lk <= 44) {
                  setKeterangan('Sesuai')
                } else if (bb < 4.7 || lk < 38) {
                  setKeterangan('Kurang');
                } else if (bb > 6.7 || lk > 44) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 5) {
                if (bb >= 5.3 && bb <= 7.3 && tb >= 59.8 && tb <= 65.9 && lk >= 39 && lk <= 45) {
                  setKeterangan('Sesuai')
                } else if (bb < 5.3 || lk < 39) {
                  setKeterangan('Kurang');
                } else if (bb > 7.3 || lk > 45) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 6) {
                if (bb >= 5.8 && bb <= 7.8 && tb >= 61.6 && tb <= 67.8 && lk >= 40 && lk <= 46) {
                  setKeterangan('Sesuai')
                } else if (bb < 5.8 || lk < 40) {
                  setKeterangan('Kurang');
                } else if (bb > 7.8 || lk > 46) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 7) {
                if (bb >= 6.2 && bb <= 8.3 && tb >= 63.2 && tb <= 69.5 && lk >= 40.5 && lk <= 46.5) {
                  setKeterangan('Sesuai')
                } else if (bb < 6.2 || lk < 40.5) {
                  setKeterangan('Kurang');
                } else if (bb > 8.3 || lk > 46.5) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 8) {
                if (bb >= 6.6 && bb <= 8.8 && tb >= 64.6 && tb <= 71.0 && lk >= 41.5 && lk <= 47.5) {
                  setKeterangan('Sesuai')
                } else if (bb < 6.6 || lk < 41.5) {
                  setKeterangan('Kurang');
                } else if (bb > 8.8 || lk > 47.5) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 9) {
                if (bb >= 7.0 && bb <= 9.2 && tb >= 66.0 && tb <= 72.3 && lk >= 42 && lk <= 48) {
                  setKeterangan('Sesuai')
                } else if (bb < 7.0 || lk < 42) {
                  setKeterangan('Kurang');
                } else if (bb > 9.2 || lk > 48) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 10) {
                if (bb >= 7.3 && bb <= 9.5 && tb >= 67.2 && tb <= 73.6 && lk >= 42.5 && lk <= 48.5) {
                  setKeterangan('Sesuai')
                } else if (bb < 7.3 || lk < 42.5) {
                  setKeterangan('Kurang');
                } else if (bb > 9.5 || lk > 48.5) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 11) {
                if (bb >= 7.6 && bb <= 9.9 && tb >= 68.5 && tb <= 74.9 && lk >= 43 && lk <= 49) {
                  setKeterangan('Sesuai')
                } else if (bb < 7.6 || lk < 43) {
                  setKeterangan('Kurang');
                } else if (bb > 9.9 || lk > 49) {
                  setKeterangan('Berlebihan');
                }
              } else if (usia === 12) {
                if (bb >= 7.8 && bb <= 10.2 && tb >= 69.6 && tb <= 76.1 && lk >= 43.5 && lk <= 49.5) {
                  setKeterangan('Sesuai')
                } else if (bb < 7.8 || lk < 43.5) {
                  setKeterangan('Kurang');
                } else if (bb > 10.2 || lk > 49.5) {
                  setKeterangan('Berlebihan');
                }
              }               
              return 'Data tidak valid';
            }

            const hitungUsia = (e) => {
                e.preventDefault();
                const date1 = moment(tglLahir);
                const date2 = moment(tglPeriksa);
                const selisihBulan = date2.diff(date1, 'months');
                setUsia(selisihBulan)
              }

              const cariDataPenimbangan = (e) => {
                e.preventDefault();
                if (cariNamaPenimbangan.trim() !== '') {
                  const hasilPenimbangan = penimbangan.filter(
                    row =>
                      row.Anak.nama.toLowerCase().includes(cariNamaPenimbangan.toLowerCase())
                  );
                  setHasilPenimbangan(hasilPenimbangan);
                } else {
                  setHasilPenimbangan([]);
                }
                };

                console.log(hasilPenimbangan);

  
  return (
    <>
    <Navbar />
        <h2 className='judul-penimbangan fw-bolder ms-4'>Form dan Data Penimbangan</h2>

        <div className='contener d-flex container-fluid'>
          
          <div className='form-penimbangan form ms-3'>
            <form onSubmit={savePenimbangan}>
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
                        dateFormat="dd/MM/yyyy"
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
                    <label className="form-label" >Tanggal Penimbangan</label>
                    <DatePicker
                        dateFormat="dd/MM/yyyy"
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
                <button type="submit" className="btn btn-primary shadow">Submit</button>
            </form>
         </div>

        
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Pilih Data Anak</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                <div className='carinama d-flex'>
                    <input type="text" className=" form-control" placeholder='Cari nama anak' value={cariNama} onChange={(e) => setCariNama(e.target.value)} />
                    <button type='submit' onClick={cariData} className='ms-2 btn btn-primary shadow' >Cari</button>
                  </div>
                
                  {hasilAnak.length > 0 ? (
                <table className="mt-2 table table-bordered is-striped is-fullwidth border-dark">
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
                        hasilAnak.map((row, index) => {
                        return (
                            <tr key={row.id}>
                            <th className='f-tbl small'>{index + 1}</th>
                            <th className='f-tbl small'>{row.nama}</th>
                            <th className='f-tbl small'>{row.tglLahir}</th>
                            <th className='f-tbl small'>{row.Ortu.namaIbu}</th>
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(row.id)} onClick={getAnakuById} onMouseLeave={hitungUsia} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>

                    ) : (

                        <table className="mt-2 table table-bordered is-striped is-fullwidth border-dark">
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
                            <th><button className='btn btn-primary' onFocus={() => setAnakId(anak.id)} onClick={getAnakuById} onMouseLeave={hitungUsia} data-bs-dismiss="modal">Pilih</button></th>
                        </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>
                        )}

                </div>
                <div className="modal-footer"> 
                </div>
                </div>
            </div>
            </div>
        </div>


        <div className='tabel-penimbangan mt-3'>
          <div className='d-flex justify-content-between'>
            <div>
              <label className='mt-2 fw-bold'>Tabel Data Penimbangan</label>
            </div>
            <div className='d-flex'>
            <input type="text" className=" form-control" placeholder='Cari nama petugas' value={cariNamaPenimbangan} onChange={(e) => setCariNamaPenimbangan(e.target.value)} />
              <button onClick={cariDataPenimbangan} className='btn bg-primary text-white ms-2'>Cari</button>
            </div>
          </div>
            <div className='table-penimbangan mt-2'>

            {hasilPenimbangan.length > 0 ? (
              <table className="table table-bordered is-striped is-fullwidth border-dark">
              <thead className='kepalaTabel bg-primary' >
                  <tr>
                      <th className='f-tbl small'>No</th>
                      <th className='f-tbl small'>Nama Anak</th>
                      <th className='f-tbl small'>Tanggal Lahir</th>
                      <th className='f-tbl small'>Nama Ibu</th>
                      <th className='f-tbl small'>Tanggal Penimbangan</th>
                      <th className='f-tbl small'>usia (bulan)</th>
                      <th className='f-tbl small'>Berat Badan</th>
                      <th className='f-tbl small'>Tinggi Badan</th>
                      <th className='f-tbl small'>Lingkar Kepala</th>
                      <th className='f-tbl small'>Keterangan</th>
                      <th className='f-tbl small'>Action</th>
                  </tr>
              </thead>
              <tbody>
                  {
                      hasilPenimbangan.map((row, index) => {
                          return (
                              <tr key={row.id}>
                          <th className='f-tbl small'>{index + 1}</th>
                          <th className='f-tbl small'>{row.Anak.nama}</th>
                          <th className='f-tbl small'>{row.Anak.tglLahir}</th>
                          <th className='f-tbl small'>{row.ibu}</th>
                          <th className='f-tbl small'>{row.tglPeriksa}</th>
                          <th className='f-tbl small'>{row.usia}</th>
                          <th className='f-tbl small'>{row.bb} kg</th>
                          <th className='f-tbl small'>{row.tb} cm</th>
                          <th className='f-tbl small'>{row.lk} cm</th>
                          <th className='f-tbl small'>{row.keterangan}</th>
                          <th className='f-tbl small'>
                              <Link to={`editPenimbangan/${row.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                              <button onClick={() => {deletePenimbangan(row.id); window.location.reload()} } className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
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
                    <th className='f-tbl small'>Nama Anak</th>
                    <th className='f-tbl small'>Tanggal Lahir</th>
                    <th className='f-tbl small'>Nama Ibu</th>
                    <th className='f-tbl small'>Tanggal Penimbangan</th>
                    <th className='f-tbl small'>usia (bulan)</th>
                    <th className='f-tbl small'>Berat Badan</th>
                    <th className='f-tbl small'>Tinggi Badan</th>
                    <th className='f-tbl small'>Lingkar Kepala</th>
                    <th className='f-tbl small'>Keterangan</th>
                    <th className='f-tbl small'>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    penimbangan.map((penimbangan, index) => {
                        return (
                            <tr key={penimbangan.id}>
                        <th className='f-tbl small'>{index + 1}</th>
                        <th className='f-tbl small'>{penimbangan.Anak.nama}</th>
                        <th className='f-tbl small'>{penimbangan.Anak.tglLahir}</th>
                        <th className='f-tbl small'>{penimbangan.ibu}</th>
                        <th className='f-tbl small'>{penimbangan.tglPeriksa}</th>
                        <th className='f-tbl small'>{penimbangan.usia}</th>
                        <th className='f-tbl small'>{penimbangan.bb} kg</th>
                        <th className='f-tbl small'>{penimbangan.tb} cm</th>
                        <th className='f-tbl small'>{penimbangan.lk} cm</th>
                        <th className='f-tbl small'>{penimbangan.keterangan}</th>
                        <th className='f-tbl small'>
                        <Link to={`editPenimbangan/${penimbangan.id}`} className='tombol-edit button is-small is-info mr-2'><AiOutlineEdit /></Link>
                        
                                <button onClick={() => deletePenimbangan(penimbangan.id) } className='button mt-1 text-white is-small bg-danger'><RiDeleteBin6Line /></button>
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

    </>
  )
}

export default Penimbangan
