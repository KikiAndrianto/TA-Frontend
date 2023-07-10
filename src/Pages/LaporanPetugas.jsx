import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LaporanPetugas = () => {
  const [petugass, setPetugas] = useState([]);
  const [cariNama, setCariNama] = useState("")
  const [hasilPetugas, setHasilPetugas] = useState([]); 

    useEffect(() => {
        getPetugas();
      },[])
    
      const getPetugas = () => {
        axios.get('http://localhost:3000/petugas')
         .then((result) => {
            const dataPetugas = result.data
            console.log(result.data);
            setPetugas(dataPetugas.data)
         }).catch((err) => {
            console.log(err);
         });
    };

    const printPDF = () => {
        const input = document.getElementById('table-to-print');
      
        html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const today = new Date();
          const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
          const dateString = today.toLocaleDateString('en-GB', options);
    
          pdf.setFont('Times New Roman')
          pdf.setPage(1);
          // pdf.addImage('https://1.bp.blogspot.com/-7q_IogOnUHo/YNHgD0ioCSI/AAAAAAAAInM/MXO6tYZM5J0PGzV7a9Wa6oJMaRRuxHD6gCLcBGAsYHQ/s16000/logo-posyandu.png', 
          // 'JPEG', 25, 10, 28, 28);
          pdf.text('Pemerintah Desa Banjarejo', pdf.internal.pageSize.getWidth() / 2, 20, { align: 'center'});
          pdf.text('Laporan Data Posyandu Desa Banjarejo', pdf.internal.pageSize.getWidth() / 2, 27, { align: 'center'});
          pdf.text('Jln. Ap Gunawan No 5 Desa Banjarejo Kecamatan Dagangan Kabupaten Madiun',pdf.internal.pageSize.getWidth() / 2, 34, { align: 'center'}, pdf.setFontSize(12));
          // pdf.text('Kabupaten Madiun',pdf.internal.pageSize.getWidth() / 2, 41, { align: 'center'}, pdf.setFontSize(12));
          pdf.setLineWidth(1);
          pdf.line(20, 38, 190, 38)
    
          pdf.text(`Tanggal : ${dateString}`, 15, 48, pdf.setFontSize(12));
          pdf.text('Data       : Petugas', 15, 55, pdf.setFontSize(12));
          pdf.text('Tabel Data Petugas', 15, 65, pdf.setFontSize(12));
          const tableY = 68;
          // Mencetak tabel menggunakan autoTable
          pdf.autoTable({
            html: '#table-to-print',
            startY: tableY, // Mengatur posisi awal tabel
          });
          // pdf.save('table.pdf');
      
          const blob = pdf.output('blob');
          const url = URL.createObjectURL(blob);
          window.open(url);
        })
        .catch((error) => {
          console.log(error);
        });
      };

      const cariData = (e) => {
        e.preventDefault();
        if (cariNama.trim() !== '') {
          const hasilPetugas = petugass.filter(
            row =>
              row.nama.toLowerCase().includes(cariNama.toLowerCase())
          );
          setHasilPetugas(hasilPetugas);
        } else {
          setHasilPetugas([]);
        }
        };

  return (
    <>
    <Navbar />
    <h2 className='judul-penimbangan fw-bolder ms-4 text-decoration-none' data-aos="fade-right" data-aos-duration="800">Laporan Data Petugas</h2>

    <div className='mt-4' data-aos="fade-left" data-aos-duration="800">
        <div className='d-flex justify-content-between'>
        <div className='d-flex'>
            <div className='d-flex ms-4'>
          <input type="text" className=" form-control" placeholder='Cari nama anak' value={cariNama} onChange={(e) => setCariNama(e.target.value)} />
            <button onClick={cariData} className='btn bg-primary text-white ms-2'>Cari</button>
          </div>
          </div>
          <div className='tesss'>
            <button onClick={printPDF} className='btn bg-primary text-white'>Cetak Data</button>
          </div>
        </div>
        <div className='table-responsive mx-4 mt-1'>

        {hasilPetugas.length > 0 ? (
          <table className="table table-bordered is-striped is-fullwidth border-dark" id="table-to-print">
          <thead className='kepalaTabel bg-primary'>
              <tr>
              <th className='f-tbl small'>No</th>
              <th className='f-tbl small'>Nama</th>
              <th className='f-tbl small'>Alamat</th>
              <th className='f-tbl small'>Jabatan</th>
              <th className='f-tbl small'>Tugas</th>
              <th className='f-tbl small'>No HP</th>
              </tr>
          </thead>
          <tbody>
            {
              hasilPetugas.map((row, index) => {
                return (
                  <tr key={row.id}>
              <th className='f-tbl small'>{index + 1}</th>
              <th className='f-tbl small'>{row.nama}</th>
              <th className='f-tbl small'>{row.alamat}</th>
              <th className='f-tbl small'>{row.jabatan}</th>
              <th className='f-tbl small'>{row.tugas}</th>
              <th className='f-tbl small'>{row.nohp}</th>
            </tr>
                )
              })
            }
          </tbody>
        </table> 
       ) : (
         <table className="table table-bordered is-striped is-fullwidth border-dark" id="table-to-print">
            <thead className='kepalaTabel bg-primary'>
                <tr>
                <th className='f-tbl small'>No</th>
                <th className='f-tbl small'>Nama</th>
                <th className='f-tbl small'>Alamat</th>
                <th className='f-tbl small'>Jabatan</th>
                <th className='f-tbl small'>Tugas</th>
                <th className='f-tbl small'>No HP</th>
                </tr>
            </thead>
            <tbody>
              {
                petugass.map((petugas, index) => {
                  return (
                    <tr key={petugas.id}>
                <th className='f-tbl small'>{index + 1}</th>
                <th className='f-tbl small'>{petugas.nama}</th>
                <th className='f-tbl small'>{petugas.alamat}</th>
                <th className='f-tbl small'>{petugas.jabatan}</th>
                <th className='f-tbl small'>{petugas.tugas}</th>
                <th className='f-tbl small'>{petugas.nohp}</th>
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

export default LaporanPetugas
