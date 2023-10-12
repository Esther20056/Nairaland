import React, { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import Topheader from '../components/Topheader';
import axios from 'axios';
import { Component } from 'react';
import { useNavigate } from 'react-router-dom';


function CreateArticle() {

    const navigate = useNavigate()

    const { quill, quillRef } = useQuill();

    const [post, setPost] = useState("")

    const handleSubmit = (u) =>{
        u.preventDefault()

        let user = JSON.parse(localStorage.getItem("user"))

        if(user == null){   

            navigate("/login")

        }else{
            
        let form = new FormData(u.currentTarget)
        form.append("description", post)
        form.append("user", user.id)
        // console.log(form.get("title"));
        // console.log(form.get("main"));
        // console.log(form.get("other"));
        // console.log(post)

        axios.post("http://localhost:8000/createarticle/", form)
        .then((res) =>{
            navigate("/")
            alert("successful")
        })
        .catch((err) => {
          for(let i in err?.response?.data){
            alert(i + "" + err?.response?.data[i])
          }
    })
        }
    }



    useEffect(() =>{

        if(quill){
            quill.on('text-change', (delta, oldDelta, source) =>{
                setPost(quill.root.innerHTML);
                console.log(post)
            })
        }

    }, [quill])

  return (
   <div className="create">
    <Topheader/>
    <div className="container">
        <form  onSubmit={handleSubmit}>

            <div>
                <label htmlFor="" className='form-label'>Title</label>
                <input name='title' type="text" className="form-control" />
            </div>

            <div>
                <label htmlFor="" className='form-label'>Main Photo</label>
                <input name='photo' type="file" className="form-control" />
            </div>

            <div>
                <label htmlFor="" className='form-label'>Other Photo</label>
                <input name='other' type="file" className="form-control" />
            </div>

            <div className='mt-3'>
                <div ref={quillRef} />
            </div>

         <button type='submit' className='btn btn-danger m-5 h-100  w-100 btn-md'>submit article</button>

        </form>
    </div>
   </div>
  )
}

export default CreateArticle