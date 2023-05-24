import React from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";

const NavbarIbu = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
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
              <li className="nav-item ms-3">
                <Link className="menu nav-link active fw-bolder" aria-current="page" to={'/homeIbu'}>
                  Home
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link className="nav-link active fw-bold" aria-current="page" to={'/data'}>
                  Data
                </Link>
              </li>
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
                  
                  <small className="fw-bold">User Login</small>
                </button>
                <ul className="dropdown-menu dropdown-menu-end animate slideIn">
                  <a className="dropdown-item">Email</a>
                  <Link className="dropdown-item">
                     Login
                    </Link>
                </ul>
              </li>
            </div>
            </form>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarIbu
