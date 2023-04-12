import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="bg-dark text-white py-3">
  <div className="container">
    <div className="row">
      <div className="col-md-6">
        <h4>Alamat Kami</h4>
        <p>Jl. Raya Puncak 123, Jakarta 12345</p>
        <p>Telp. (021) 123-4567</p>
        <p>Email: info@contoh.com</p>
      </div>
      <div className="col-md-6">
        <h4>Tautan Berguna</h4>
        <ul className="list-unstyled">
          <li><a href="#">Beranda</a></li>
          <li><a href="#">Tentang Kami</a></li>
          <li><a href="#">Produk</a></li>
          <li><a href="#">Kontak</a></li>
        </ul>
      </div>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer
