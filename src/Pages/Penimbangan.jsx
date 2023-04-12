import React from 'react'

const Penimbangan = () => {
  return (
    <>
        <h2 className='judul fw-bolder ms-4'>Data Penimbangan</h2>

        <div className='ortu d-flex row container-fluid'>
          
          <div className='form ms-3 col-md-4'>
            <form >
                <div className="mb-2 mt-3">
                <label  className="form-label">Nama Ibu</label>
                <input type="text" className="form-control" />
                </div>
                <div className="mb-2">
                    <label className="form-label">NIK Ibu</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-2">
                    <label className="form-label">Nama Ayah</label>
                    <input type="text" className="form-control" />
                </div><div className="mb-2">
                    <label className="form-label">NIK Ayah</label>
                    <input type="text" className="form-control" />
                </div><div className="mb-2">
                    <label className="form-label">Alamat</label>
                    <input type="text" className="form-control" />
                </div><div className="mb-3">
                    <label className="form-label">No Hp</label>
                    <input type="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type='submit' className='btn ms-2 btn-primary'>Update</button>
            </form>
         </div>

        </div>
    </>
  )
}

export default Penimbangan
