import React, { useEffect, useState } from "react";
import '../App.css'
import {Link, useNavigate} from 'react-router-dom'
import AOS from "aos";
import "aos/dist/aos.css";
import swal from 'sweetalert'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  AOS.init();

  const loginFailed = () => {
    swal({
      icon: "error",
      text: "Periksa Username atau Password anda kembali!",
    });
  };


  const isEmail = async () => {
    try {
      let user = await fetch(
        "http://localhost:3000/user/login",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: password }),
        }
      );

      user = await user.json();
      const userID = user.data.id;
      console.log(user);
      if (user.data.token) {
        const role = user.data.role
        localStorage.setItem("authToken", user.data.token);
         localStorage.setItem("userId", user.data.id);
          localStorage.setItem("userName", user.data.username);
          localStorage.setItem("userEmail", user.data.email);
          localStorage.setItem("userRole", user.data.role);
  
        await swal({
          text: user.message,
          icon: "success",
        });
        
       if (role == "Ibu") {
        navigate("/homeIbu")
       } else {
        navigate("/home")
       }
      } else {
        throw "Gagal Login!";
      }
    } catch (error) {
      console.log(error);
      loginFailed();
    }
  };

  // const isUsername = async () => {
  //   try {
  //     let user = await fetch(
  //       "http://localhost:3000/user/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           Accept: "*/*",
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ username: unameOrEmail, password: password }),
  //       }
  //     );

  //     user = await user.json();
  //     const userID = user.id;
  //     console.log(user);
  //     if (user.token) {
  //       localStorage.setItem("authToken", user.token);

  //       try {
  //         let userData = await fetch(
  //           "http://localhost:3000/user/" +
  //             userID,
  //           {
  //             method: "GET",
  //             headers: {
  //               Accept: "application/json",
  //               "Content-Type": "application/json",
  //               authorization: localStorage.getItem("authToken"),
  //             },
  //           }
  //         );
  //         userData = await userData.json();
  //         const userId = userData.data.id;
  //         const userName = await userData.data.username;
  //         const userEmail = await userData.data.email;

  //         localStorage.setItem("userId", JSON.stringify(userId));
  //         localStorage.setItem("userName", JSON.stringify(userName));
  //         localStorage.setItem("userEmail", JSON.stringify(userEmail));
  //       } catch (error) {
  //         loginFailed();
  //       }
  //       await Swal.fire({
  //         text: user.message,
  //         icon: "success",
  //       });
  //       navigate("/");
  //     } else {
  //       throw "Gagal Login!";
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     loginFailed();
  //   }
  // };


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
      <input type="text" className="form-control border rounded rounded-pill mt-3" placeholder='nik' onChange={(e) => setEmail(e.target.value)}/>
      <input type="password" className="form-control border rounded rounded-pill mt-3" placeholder='password' 
      value={password}onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className='btn-login '>
         <button className='btn-lgn btn btn-primary shadow border rounded rounded-pill'
         onClick={(e) => isEmail(e.preventDefault())} >Login</button>
      </div>
      <p className='text-center mt-3' >Masukkan NIK ibu dan password yang telah di berikan oleh petugas</p>
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

export default Login
