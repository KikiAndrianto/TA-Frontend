import React, { useEffect, useState } from "react";
import banner from "../assets/banner.svg";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsFillPersonFill,
  BsFillLockFill,
} from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";
import { validate, res } from "react-email-validator";

const LoginUser = () => {
  const navigate = useNavigate();
  const [unameOrEmail, setUnameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [change, setChange] = useState("password");

  AOS.init();
  const loginFailed = () => {
    swal.fire({
      icon: "error",
      text: "Periksa Username atau Password anda kembali!",
    });
  };

//   const getPassword = () => {
//     setChange("text");
//     console.log(change);
//   };

//   const hidePassword = () => {
//     setChange("password");
//   };

  const isEmail = async () => {
    try {
      let user = await fetch(
        "https://backend-reservasi-production.up.railway.app/user/login",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: unameOrEmail, password: password }),
        }
      );

      user = await user.json();
      const userID = user.id;
      console.log(user);
      if (user.token) {
        localStorage.setItem("authToken", user.token);

        try {
          let userData = await fetch(
            "https://backend-reservasi-production.up.railway.app/user/profile/" +
              userID,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("authToken"),
              },
            }
          );
          userData = await userData.json();
          const userId = userData.data.id;
          const userName = await userData.data.username;
          const userEmail = await userData.data.email;

          localStorage.setItem("userId", JSON.stringify(userId));
          localStorage.setItem("userName", JSON.stringify(userName));
          localStorage.setItem("userEmail", JSON.stringify(userEmail));
        } catch (error) {
          loginFailed();
        }
        await Swal.fire({
          text: user.message,
          icon: "success",
        });
        navigate("/");
      } else {
        throw "Gagal Login!";
      }
    } catch (error) {
      console.log(error);
      loginFailed();
    }
  };

  const isUsername = async () => {
    try {
      let user = await fetch(
        "https://backend-reservasi-production.up.railway.app/user/login",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username: unameOrEmail, password: password }),
        }
      );

      user = await user.json();
      const userID = user.id;
      console.log(user);
      if (user.token) {
        localStorage.setItem("authToken", user.token);

        try {
          let userData = await fetch(
            "https://backend-reservasi-production.up.railway.app/user/profile/" +
              userID,
            {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                authorization: localStorage.getItem("authToken"),
              },
            }
          );
          userData = await userData.json();
          const userId = userData.data.id;
          const userName = await userData.data.username;
          const userEmail = await userData.data.email;

          localStorage.setItem("userId", JSON.stringify(userId));
          localStorage.setItem("userName", JSON.stringify(userName));
          localStorage.setItem("userEmail", JSON.stringify(userEmail));
        } catch (error) {
          loginFailed();
        }
        await Swal.fire({
          text: user.message,
          icon: "success",
        });
        navigate("/");
      } else {
        throw "Gagal Login!";
      }
    } catch (error) {
      console.log(error);
      loginFailed();
    }
  };

  const LoginHandle = async () => {
    validate(unameOrEmail);
    if (res) {
      isEmail();
    } else {
      isUsername();
    }
  };

  return (
    <>
      <section className="m-4">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="text-black">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div
                      className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1"
                      data-aos="fade-right"
                      data-aos-duration="800"
                    >
                      <a href="/">
                        <img src={logo} alt="" width={250} />
                      </a>
                      <form className="mx-1 mx-md-4 mt-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <div className="d-flex form-outline flex-fill mb-0">
                            <BsFillPersonFill className="m-auto me-2" />
                            <input
                              type="text"
                              name="username"
                              className="form-control me-4"
                              placeholder="Username atau Email"
                              onChange={(e) => setUnameOrEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mt-3 mb-4">
                          {change === "password" && (
                            <div className="d-flex flex-fill">
                              <BsFillLockFill className="m-auto me-2" />
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                id="password-input"
                                placeholder="Password"
                                value={password}
                                required
                                onChange={(e) =>
                                  setPassword(
                                    e.target.value,
                                    setChange(e.target.type)
                                  )
                                }
                              />
                              <BsFillEyeFill
                                className="m-auto ms-2"
                                onClick={(e) => getPassword(e.preventDefault())}
                              />
                            </div>
                          )}
                          {change === "text" && (
                            <div className="d-flex flex-fill">
                              <BsFillLockFill className="m-auto me-2" />
                              <input
                                className="form-control"
                                type="text"
                                name="password"
                                id="password-input"
                                placeholder="Masukkan Password"
                                value={password}
                                onChange={(e) =>
                                  setPassword(
                                    e.target.value,
                                    setChange(e.target.type)
                                  )
                                }
                              />
                              <BsFillEyeSlashFill
                                className="m-auto ms-2"
                                onClick={(e) =>
                                  hidePassword(e.preventDefault())
                                }
                              />
                            </div>
                          )}
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            id="submit"
                            type="submit"
                            className="btn btn-danger btn-lg shadow"
                            onClick={(e) => LoginHandle(e.preventDefault())}
                          >
                            Login
                          </button>
                        </div>
                        <div>
                          <p className="text-center">
                            Belum punya akun? Silahkan{" "}
                            <Link
                              to="/register"
                              className="text-decoration-none text-danger"
                            >
                              Daftar
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>

                    <div
                      className="col-md-10 mt-5 col-lg-6 col-xl-5 order-2 order-lg-1 responsive-hide"
                      data-aos="fade-left"
                      data-aos-duration="800"
                    >
                      <img src={banner} alt="" width={450} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginUser;