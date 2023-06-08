import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const LaporanPenimbangan = () => {
    const [penimbangan, setPenimbangan] = useState([])
    const [cariNamaPenimbangan, setCariNamaPenimbangan] = useState("")
    const [hasilPenimbangan, setHasilPenimbangan] = useState([]); 

    useEffect(() => {
        getPenimbangan();
      },[])

      const getPenimbangan = () => {
        axios.get('http://localhost:3000/penimbangan')
        .then((result) => {
          const dataPenimbangan = result.data
          setPenimbangan(dataPenimbangan.data)
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
          pdf.text('Data       : Penimbangan', 15, 55, pdf.setFontSize(12));
          pdf.text('Tabel Data Penimbangan', 15, 65, pdf.setFontSize(12));
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
    <h2 className='judul-penimbangan fw-bolder ms-4 text-decoration-none' data-aos="fade-right" data-aos-duration="800">Laporan Data Penimbangan</h2>

    <div className='mt-4' data-aos="fade-left" data-aos-duration="800">
        <div className='d-flex justify-content-between'>
        <div className='d-flex'>
            <div className='d-flex ms-4'>
          <input type="text" className=" form-control" placeholder='Cari nama anak' value={cariNamaPenimbangan} onChange={(e) => setCariNamaPenimbangan(e.target.value)} />
            <button onClick={cariDataPenimbangan} className='btn bg-primary text-white ms-2'>Cari</button>
          </div>
          </div>
          <div className='tesss'>
            <button onClick={printPDF} className='btn bg-primary text-white'>Cetak Data</button>
          </div>
        </div>
        <div className='table-responsive mx-4 mt-1'>

        {hasilPenimbangan.length > 0 ? (
        <table className="table table-bordered is-striped is-fullwidth border-dark" id="table-to-print">
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
                    <th className='f-tbl small'>Tanggal Penimbangan</th>
                    <th className='f-tbl small'>usia (bulan)</th>
                    <th className='f-tbl small'>Berat Badan</th>
                    <th className='f-tbl small'>Tinggi Badan</th>
                    <th className='f-tbl small'>Lingkar Kepala</th>
                    <th className='f-tbl small'>Keterangan</th>
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

export default LaporanPenimbangan
