import React,{useState} from 'react'
import URL from './config'
import axios from 'axios'
const App = () => {
   const [a, seta]  = useState([])
   const [loading, setloading] = useState(false)
   const handleChange = (e) =>{
    setloading(true)
    let fr = new FileReader()
    let file = e.target.files[0]

    fr.onload= () =>{
        console.log(fr.result)
    }
    if(file){
        return fr.readAsDataURL(file)
    }

   }
  return (
    <div>   
       <h1>Upload Images</h1>
       <input type="file" onChange={handleChange} />
       <h2>{loading? "uploading...." : "uploading done"}</h2>
        {a?.map(x=><img src={x.image} width="100px" height="100px"/>)}
    </div>
  )
}

export default App
