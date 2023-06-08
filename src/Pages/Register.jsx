import React, { useEffect, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import swal from 'sweetalert'
import axios from 'axios';


const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();

    AOS.init();

    const setUser = async () => {
      if (email === "" || username === "" || password === "") {
        swal({
          icon: "error",
          text: "Data Tidak Boleh Kosong!",
        });
      } else if (username.length < 4 || password.length < 6) {
        swal({
          icon: "error",
          text: "Username minimal 4 karakter dan Password minimal 6 karakter!",
        });
      } else{
        swal({
          text: "Selamat anda berhasil Registrasi, Silahkan Login!",
          icon: "success",
        });

        let regis = {
        email: email,
        username: username,
        password: password,
        };

        try {
          const user = await axios.post(
            "http://localhost:3000/user/register",
            regis,
            {
              headers: {
                Accept: "*/*",
                "Content-Type": "application/json",
              },
            }
          );
          console.log(user.data);
          Navigate("/");
        } catch (error) {
          console.log(error);
          swal({
            icon: "error",
            text: "Username atau Email sudah digunakan!",
          });
        }
      }
    }

  return (
    <>
      <div className='formLogin row mt-4 fixed-top'>
      <div className='col-md-4 align-items-center' data-aos="fade-right" data-aos-duration="800">
        <div className='judul-login d-flex'>
        <img src="https://1.bp.blogspot.com/-7q_IogOnUHo/YNHgD0ioCSI/AAAAAAAAInM/MXO6tYZM5J0PGzV7a9Wa6oJMaRRuxHD6gCLcBGAsYHQ/s16000/logo-posyandu.png"  
        width="100" />
        <h2 className='mt-4 fw-bold' > <label className='text-primary'>Posyandu</label>  Banjarejo</h2>
      </div>
      <form >
        <div className='form-login'>
      <input type="text" className="form-control border rounded rounded-pill mt-3" placeholder='username' onChange={(e) => setUserame(e.target.value)} />
      <input type="text" className="form-control border rounded rounded-pill mt-3" placeholder='email' onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="form-control border rounded rounded-pill mt-3" placeholder='password' onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className='btn-login '>
         <button className='btn-lgn btn btn-primary shadow border rounded rounded-pill' onClick={(e) => setUser(e.preventDefault())}>Daftar</button>
      </div>
      <p className='text-center mt-3' >Sudah punya akun? Silahkan <Link className="text-primary" to={'/'}>Login</Link></p>
      </form>
      </div>

      <div className='gambar ms-5 col-md-4' data-aos="fade-left" data-aos-duration="800">
        <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7853.jpg?w=740&t=st=1683607568~exp=1683608168~hmac=089e006439b2e8db74384c41997cb30875e28c3a7e6e24be7b690e276b54c322" 
        alt=""
        width="500" />
      </div>
     
    </div>
    </>
  )
}

export default Register
