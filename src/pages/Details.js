import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import contents from '../fakedb'
import axios from 'axios'

function Details() {

    const { id } = useParams()


    const [data, setData] = useState(null)

    console.log(data)

  // // alert(id)
  //   const info = contents.find((a => a?.id == id))

 useEffect(() =>{
  axios.get(`http://localhost:8000/getarticle/${id}`)
  .then((res) => {
   
    setData(res.data)
    console.log(res.data);
  })
  .catch((err) => console.log(err))
}, [id] )


  return (
    <div >
         <h1 className="text-center text-uppercase">{data?.title}</h1>
        <p  className="text-success fs-2  fs-normal" dangerouslySetInnerHTML={{
          __html: data?.description
        }}></p>
         <img src={`http://localhost:8000/${data?.photo}`} alt={data?.title} />
         <img src={`http://localhost:8000/${data?.photo}`} alt={data?.title} />
    </div> 
  )
}

export default Details