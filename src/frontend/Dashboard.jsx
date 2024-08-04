import Appbar from "./components/Appbar";
import Balance from "./components/Balance";
import Users from './components/Users'
import axios from 'axios'
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Dashboard(){

const [username,setUsername] = useState(null)
const [error,setError] = useState(null)
const [balance,setBalance] = useState(0)
const navigate = useNavigate();

if(!localStorage.getItem('token')){
    setTimeout(()=>{
navigate('/signin')
    },2500)
    return<div>No Token Found, Login Again</div>
}

useEffect(()=>{
const fetchUser = async()=>{
try{

const token = localStorage.getItem('token')

const response  = await axios.get('http://localhost:3000/user/me',{
    headers:{
        authorization:token
    }
})
setUsername(response.data.username)
setBalance(response.data.balance)
}catch(err){
    setError(err);
    setTimeout(()=>{
        navigate('/signin')
            },2500)
}

}

fetchUser()

},[])



if (error) {
    return <div>ERROR</div>;
  }

  if (!username) {
    return <div>Loading...</div>;
    
  }
  return <div>
<Appbar label={"PayTM"} name={username}></Appbar>
<div className="flex flex-col ml-6 mt-7">
<Balance balance={balance}/>

<Users/>


</div>
    </div>
}