import React from 'react'
import {Link} from 'react-router-dom'
import '../App.css'

const Footer = () => {
  return (
    <>
      <footer className=" text-center text-lg-start text-white bg-primary">
        <section className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom"></section>
        <section className="">
          <div className="container-fluid text-center text-md-start mt-3">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-2">
                <h6 className="text-uppercase fw-bold mb-2">
                  Posyandu Desa Banjarejo
                </h6>
                <p>
                  RT.06/RW.02 Desa Banjarejo Kec. Dagangan, Kab. Madiun Jawa
                  Timur 66229
                </p>
              </div>

              {/* <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Link</h6>
                <p>
                  <Link to="/" className="text-reset text-decoration-none">
                    Beranda
                  </Link>
                </p>
                <p>
                  <Link to="/rute" className="text-reset text-decoration-none">
                    Rute Travel
                  </Link>
                </p>
                <p>
                  <a
                    href="https://www.lajujaya.id"
                    className="text-reset text-decoration-none"
                  >
                    Profil Bisnis
                  </a>
                </p>
              </div> */}

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-2">
                <h6 className="text-uppercase fw-bold mb-2">Kontak</h6>
                <p>
                  <i className="fas fa-envelope"></i>
                  lajujaya712@gmail.com
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="pb-3">
          <p className="m-auto text-center text-white">
            © 2023 Posyandu Desa Banjarejo - All Rights Reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default Footer
