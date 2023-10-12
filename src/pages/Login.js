import React, { useState, useLayoutEffect, useEffect } from 'react'
import Topheader from './../components/Topheader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  async function handleLogin(a) {
    a.preventDefault()

    let form = new FormData(a.currentTarget)


    await axios.post("https://OLamideola.pythonanywhere.com/login/", form)
      .then((res) => {
       localStorage.setItem("user", JSON.stringify(res.data));
       alert('Login successful')
       navigate("/")
      })
      .catch((err) => {
        console.log(err.response.data);
        if (err?.response?.data == "Invalid credentials provided") {
          alert("Invalid credentials")
        } else {
          for (let i in err?.response?.data) {
            alert(i + "" + err?.response?.data[i])
          }
        }
      })

  }

  return (
    <div className='login' >
      <Topheader />
      <form className='m-5' onSubmit={(a) => handleLogin(a)} >
        <div className='row  '>

          <div className='col-md-6'>
            <label htmlFor="" className='fw-success fs-1 fst-italic  '>Email</label>
            <input name='email' type="email" className='form-control' />
          </div>


          <div className='col-md-6'>
            <label htmlFor="" className='fw-success fst-italic  fs-1'>Password</label>
            <input name='password' type="password" className='form-control' />
          </div>


          <button typeof='submit' className='w-50 btn-md  btn-success mt-4 btn'>Login</button>


        </div>



      </form>


    </div>

  )
}

export default Login