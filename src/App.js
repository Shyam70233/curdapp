import React,{useEffect, useState} from 'react'
import URL from './config'
import axios from 'axios'
const App = () => {
    const [ob1, setob1] = useState({
        name:'',
        email:'',
    })
    const [ob2, setob2] = useState({
        id:'',
        name:'',
        email:'',
    })
    const [x,setx] = useState([])
    const insert = () =>{
        axios.post(URL +".json",ob1)
        .then(d=>d.data)
        .then(d=>{
            let id = d.name
            setx([...x,{...ob1,id}])
        })
        .catch(e=>console.log("After Insert err", e))
        
    }
    const update = () => {
           let  {name,email, id } = ob2;
        //    console.log("Yes",email)
          axios.patch(URL+"/"+id+".json", {name, email})
           .then(d=>d.data)
            .then(d=>{
                console.log("Updated Successfull")
                setx(x.map(x=>x.id ===ob2.id ? ob2:x))
            })
            .catch(d=>console.log("update failed",d))
    }
    
    const edittable = x =>setob2(x)

    const deleettable = x =>{
 
        axios.delete(URL + "/" + x.id +".json")
        .then(d=>d.data)
        .then(d=>{
            console.log("Delete successfull",d)
            setx(x.filter((item)=>item.id !== x.id))
        })
        .catch(d=>console.log("Delete failed",d))
    }

    const handleClick = (e) => {
        let key  = e.target.name;
        let val  = e.target.value;
        setob1({...ob1,[key]:val })
    }

    const handleClick1 = (e) => {
        let key  = e.target.name;
        let val  = e.target.value;
        setob2({...ob2,[key]:val })
    }
    const boot = () => {
        axios.get(URL+".json")
        .then(res=>res.data)
        .then(d=>d || [])
        .then(d=>{
            // console.log(d)
            if(d !==null){
                let temp =[]
                let x = Object.keys(d)
                let y = Object.values(d)
                for(let i=0;i<x.length;i++){
                    temp.push({id:x[i],...y[i]})    
                }
                setx(temp)
            }
        }
        )
        .catch(e=>console.log("something error",e))
    }
    useEffect(boot,[])
  return (
    <div>
       Insert
       
       <div>
            <input value={ob1.name} name="name" onChange={handleClick}/>
            <input value={ob1.email} name="email" onChange={handleClick}/>
            <button onClick={insert}>Insert Value</button>
       </div>

       Edit Form Here 
       <div>
            <input value={ob2.name} name="name" onChange={handleClick1}/>
            <input value={ob2.email} name="email" onChange={handleClick1}/>
            <button onClick={update}>Update </button>
       </div>
       All data
       <h1>All Data {x.length}</h1>
       <table border={1}>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {x.map((x,index)=>(
                <tr key={index}>
                    <td>{x.id}</td>
                    <td>{x.name}</td>
                    <td>{x.email}</td>
                    <td>
                        <button onClick={()=>edittable(x)}>Edit</button>
                        <button onClick={()=>deleettable(x)}>Delete {x.id}</button>
                    </td>
                </tr>
            ))}
        </tbody>
       </table>
    </div>
  )
}

export default App
