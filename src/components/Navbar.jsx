import React from "react";
import '../App.css'
import {Link} from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  AOS.init();
  const user = localStorage.getItem("userName").replace(/["]/g, "");
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top" data-aos="fade-down" data-aos-duration="800">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://1.bp.blogspot.com/-7q_IogOnUHo/YNHgD0ioCSI/AAAAAAAAInM/MXO6tYZM5J0PGzV7a9Wa6oJMaRRuxHD6gCLcBGAsYHQ/s16000/logo-posyandu.png"
              className="logo "
              alt="Bootstrap"
              width="70"
              height="50"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="menu nav-item ms-3 text-decoration-none">
                <Link className="nav-link active fw-bolder text-decoration-none" aria-current="page" to={'/home'}>
                  Home
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link active fw-bold" aria-current="page" to={'/orangtua'}>
                  Orang Tua
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link active fw-bold" to={'/anak'}>
                  Anak
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="menu-nav nav-link active fw-bold text-decoration-none" to={'/petugas'}>
                  Petugas
                </Link>
              </li>
              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle active fw-bold"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Posyandu
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to={'/penimbangan'}>
                       Penimbangan
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={'/imunisasi'}>
                       Imunisasi
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown ms-3">
                <a
                  className="nav-link dropdown-toggle active fw-bold"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Laporan
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to={'/laporanAnak'}>
                      Data Anak
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={'/laporanOrtu'}>
                      Data Orang Tua
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={'/laporanPetugas'}>
                      Data Petugas
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={'/laporanPenimbangan'}>
                      Data Penimbangan
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={'/laporanImunisasi'}>
                      Data Imunisasi
                    </Link>
                  </li>
                </ul>
              </li>
              {/* <li className="nav-item ms-3">
                <Link className="menu-nav nav-link active fw-bold text-decoration-none" to={'/AdminCekData'}>
                  Cek Data
                </Link>
              </li> */}
            </ul>
            <form className="d-flex">
            <div className="navbar-nav responsive-hide">
              <li className="nav-item dropdown">
                <button
                  className="nav-link bg-transparent border rounded rounded-pill"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  
                  <small className="fw-bold">{user}</small>
                </button>
                <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                  <Link className="dropdown-item" to={'/'}>
                     Logout
                    </Link>
                </ul>
              </li>
            </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
