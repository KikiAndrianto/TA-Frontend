import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LaporanImunisasi = () => {
  const [imunisasi, setImunisasi] = useState([])
  const [cariNamaImunisasi, setCariNamaImunisasi] = useState("")
  const [hasilImunisasi, setHasilImunisasi] = useState([]);

  useEffect(() => {
    getImunisasi();
  },[])

  const getImunisasi = () => {
    axios.get('http://localhost:3000/imunisasi')
    .then((result) => {
      const dataImunisasi = result.data
      setImunisasi(dataImunisasi.data)
   }).catch((err) => {
      console.log(err);
   });
  }

  const printPDF = () => {
    const input = document.getElementById('table-to-print');
  
    html2canvas(input)
    .then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const today = new Date();
      const dateString = today.toLocaleDateString(); 

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
      pdf.text('Data       : Imunisasi', 15, 55, pdf.setFontSize(12));
      pdf.text('Tabel Data Imunisasi', 15, 65, pdf.setFontSize(12));
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

  const cariDataImunisasi = (e) => {
    e.preventDefault();
    if (cariNamaImunisasi.trim() !== '') {
      const hasilImunisasi = imunisasi.filter(
        row =>
          row.Anak.nama.toLowerCase().includes(cariNamaImunisasi.toLowerCase())
      );
      setHasilImunisasi(hasilImunisasi);
    } else {
      setHasilImunisasi([]);
    }
    };

  return (
    <>
    <Navbar />
     <h2 className='judul-penimbangan fw-bolder ms-4 text-decoration-none' data-aos="fade-right" data-aos-duration="800">Laporan Data Imunisasi</h2>

     <div className='mt-4' data-aos="fade-left" data-aos-duration="800">
        <div className='d-flex justify-content-between'>
        <div className='d-flex'>
            <div className='d-flex ms-4'>
          <input type="text" className=" form-control" placeholder='Cari nama anak' value={cariNamaImunisasi} onChange={(e) => setCariNamaImunisasi(e.target.value)} />
            <button onClick={cariDataImunisasi} className='btn bg-primary text-white ms-2'>Cari</button>
          </div>
          </div>
          <div className='tesss'>
            <button onClick={printPDF} className='btn bg-primary text-white'>Cetak Data</button>
          </div>
        </div>
        <div className='table-responsive mx-4 mt-1'>

        {hasilImunisasi.length > 0 ? (
          <table className="table table-bordered is-striped is-fullwidth border-dark" id="table-to-print">
          <thead className='kepalaTabel bg-primary' >
              <tr>
                  <th className='f-tbl small'>No</th>
                  <th className='f-tbl small'>Nama Anak</th>
                  <th className='f-tbl small'>Tanggal Lahir</th>
                  <th className='f-tbl small'>Nama Ibu</th>
                  <th className='f-tbl small'>Tanggal Imunisasi</th>
                  <th className='f-tbl small'>usia</th>
                  <th className='f-tbl small'>Jenis Vaksin</th>
                  <th className='f-tbl small'>Keterangan</th>
              </tr>
          </thead>
          <tbody>
              {
                  hasilImunisasi.map((row, index) => {
                      return (
                          <tr key={row.id}>
                      <th className='f-tbl small'>{index + 1}</th>
                      <th className='f-tbl small'>{row.Anak.nama}</th>
                      <th className='f-tbl small'>{row.Anak.tglLahir}</th>
                      <th className='f-tbl small'>{row.ibu}</th>
                      <th className='f-tbl small'>{row.tglImunisasi}</th>
                      <th className='f-tbl small'>{row.usia}</th>
                      <th className='f-tbl small'>{row.jenisVaksin}</th>
                      <th className='f-tbl small'>{row.keterangan}</th>
                      </tr>
                      )
                  })
              }
          </tbody>
          </table>
       ) : (
        <table className="table table-bordered is-striped is-fullwidth border-dark" id="table-to-print">
        <thead className='kepalaTabel bg-primary' >
            <tr>
                <th className='f-tbl small'>No</th>
                <th className='f-tbl small'>Nama Anak</th>
                <th className='f-tbl small'>Tanggal Lahir</th>
                <th className='f-tbl small'>Nama Ibu</th>
                <th className='f-tbl small'>Tanggal Imunisasi</th>
                <th className='f-tbl small'>usia</th>
                <th className='f-tbl small'>Jenis Vaksin</th>
                <th className='f-tbl small'>Keterangan</th>
            </tr>
        </thead>
        <tbody>
            {
                imunisasi.map((imunisasi, index) => {
                    return (
                        <tr key={imunisasi.id}>
                    <th className='f-tbl small'>{index + 1}</th>
                    <th className='f-tbl small'>{imunisasi.Anak.nama}</th>
                    <th className='f-tbl small'>{imunisasi.Anak.tglLahir}</th>
                    <th className='f-tbl small'>{imunisasi.ibu}</th>
                    <th className='f-tbl small'>{imunisasi.tglImunisasi}</th>
                    <th className='f-tbl small'>{imunisasi.usia}</th>
                    <th className='f-tbl small'>{imunisasi.jenisVaksin}</th>
                    <th className='f-tbl small'>{imunisasi.keterangan}</th>
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

export default LaporanImunisasi
