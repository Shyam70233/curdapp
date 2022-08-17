import React,{useEffect, useState} from 'react'
import URL from './config'
import axios from 'axios'
const App = () => {
   const [a, seta]  = useState([])
   const [loading, setloading] = useState(false)

   const insert = src =>{
     axios.post(URL+".json",{src})
     .then(d=>d.data)
     
     .then(d=>{
        console.log(" Your Res Data ",d)
        setloading(false)
        seta([...a, { src }]);
    })
    .catch(e=>console.log("Error Somthing", e))
    //     console.log("finally Data",d)
    //  .finally(d=>{
    //  })
   }

   const handleChange = async e => {
        setloading(true)
        let temp =[]
        for(let i=0; i < e.target.files.length;i++){
        let r = await createImage(e.target.files[i],i)
        }
   }
   const createImage = (file, index) => {
    let fr = new FileReader()
    fr.onload = () =>insert(fr.result)
    if(file){
        return fr.readAsDataURL(file)
    }
   }

   const boot = () =>{
    axios.get(URL+".json")
    .then(res=>res.data)
    // .then(d=>console.log("hey hey",d))
    .then(d=>{
        console.log("Your output Data ",d)
        let temp = []
        let x = Object.keys(d)
        let y = Object.values(d)
        for (let i=0; i < x.length; i++) {
            temp.push({ id: x[i],...y[i] })
        }
        seta(temp)
    })
    .catch(e => console.log("error loding::",e))

   }

   useEffect(boot,[])
  return (
    <div>   
       <h1>Upload Imagess</h1>
       <input type="file" multiple={true} onChange={handleChange} />
       <h2>{loading? "uploading...." : "uploading done"}</h2>
        {a?.map(x=><img src={x.src} width={100} height={100} />)}
    </div>
  )
}

export default App
