import React from 'react'
import { AiOutlineEdit} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";

const Anak = () => {
  return (
    <>
      <h2 className='judul fw-bolder ms-4'>Form dan Data Anak</h2>
      <div className='ortu d-flex row container-fluid'>

        <div className='form ms-3 col-md-4'>
          <form>
              <div className="mb-2 mt-3">
              <label  className="form-label">Nama</label>
              <input type="text" className="form-control"  />
              </div>
              <div className="mb-2">
                  <label className="form-label">NIK</label>
                  <input type="text" className="form-control" />
              </div>
              <div className="mb-2">
                  <label className="form-label">Tempat & Tanggal Lahir</label>
                  <input type="text" className="form-control"/>
              </div><div className="mb-2">
                  <label className="form-label">Jenis Kelamin</label>
                  <select class="form-select mb-2" id="inputJK" name="inputJK">
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
              </div><div className="mb-3">
                  <label className="form-label">Nama Ibu</label>
                  <input type="text" className="form-control"/>
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type='submit' className='btn ms-2 btn-primary'>Update</button>
          </form>
      </div>


      <div className='tableOrtu col mt-3 ms-3'>
        <label className='mb-1'>Tabel Data Anak</label>
        <table className="table table-bordered is-striped is-fullwidth border-dark">
        <thead className='kepalaTabel bg-primary' >
            <tr>
            <th className='small'>No</th>
            <th className='small'>Nama</th>
            <th className='is-small'>Nik</th>
            <th className='small'>Tempat & Tanggal Lahir</th>
            <th className='small'>Jenis Kelamin</th>
            <th className='small'>Nama Ibu</th>
            <th className='small'>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
              <th className='small'></th>
              <th className='small'></th>
              <th className='small'></th>
              <th className='small'></th>
              <th className='small'></th>
              <th className='small'></th>
              <th className='small'>
                  <button className='button is-small is-info mr-2 bg-success'><AiOutlineEdit /></button>
                  <button className='button mt-1 is-small bg-danger ms-2'><RiDeleteBin6Line /></button>
              </th>
          </tr>
        </tbody>
        </table>
    </div>
        

      </div>
    </>
  )
}

export default Anak
