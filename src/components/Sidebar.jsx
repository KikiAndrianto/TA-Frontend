import React from "react";

const Sidebar = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="bg-primary col-auto col-md-2 min-vh-100">
            <div className="p-2">
              <a className="d-flex text-decoration-none mt-1 align-items-center text-white">
                
                <span className="fs-4 ms-3 d-none d-sm-inline">Banjarejo</span>
              </a>
              <hr/>
              <ul class="nav nav-pills flex-column mt-4">
                <li class="nav-item">
                  <a href="#" class="nav-link text-white" >
                    <i className="fs-5 fa fa-gauge"></i>
                    <span className="fs-5  ms-3 d-none d-sm-inline">Dasboard</span>
                  </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link text-white mt-1">
                    <i className="fs-5 fa fa-house"></i>
                    <span className="fs-5 ms-3 d-none d-sm-inline">Home</span>
                  </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link text-white">
                    <i className="fs-5 fa fa-table-list"></i>
                    <span className="fs-5 ms-3 d-none d-sm-inline">Orang Tua</span>
                  </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link text-white">
                    <i className="fs-5 fa fa-grid2"></i>
                    <span className="fs-5 ms-3 d-none d-sm-inline">Anak</span>
                  </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link text-white">
                    <i className="fs-5 fa fa-table-list"></i>
                    <span className="fs-5 ms-3 d-none d-sm-inline">Penimbangan</span>
                  </a>
                </li>
                <li class="nav-item">
                <a href="#" class="nav-link text-white">
                    <i className="fs-5 fa fa-table-list"></i>
                    <span className="fs-5 ms-3 d-none d-sm-inline">Imunisasi</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
