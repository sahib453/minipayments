import Heading  from "./components/Heading";
import Inputbox from "./components/Inputbox";
import Subheading from "./components/Subheading";
import Button from "./components/Button";
import  BottomWarning  from "./components/BottomWarning";
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

export default function Signup() {
const [username,setUsername] = useState("")
const [password,setPassword] = useState("")
const [name,setName] = useState("")
const navigate = useNavigate()




  return <div className="flex justify-center border bg-slate-300 h-screen">
    <div className="flex flex-col justify-center">
    <div className="rounded-lg bg-white w-80 text-center p-2 h-max ">

    <Heading label={"Sign Up"}/>
    <Subheading label={"Enter your account information to create a new account"}/>
    <Inputbox label={"Username"} placeholder={"joe323"} onChange={e=>setUsername(e.target.value)}/>
    <Inputbox type={"password"} className="password" label={"Password"} placeholder={"124532rw@"} onChange={e=>setPassword(e.target.value)}/>
    <Inputbox label={"Full Name"} placeholder={"Joe Biden"} onChange={e=>setName(e.target.value)}/>
    <Button onClick={
      async()=>{
        const response = await axios.post('https://minipaymentbackend-api.vercel.app/user/signup',{
          username,
          password,
          name
        })
      localStorage.setItem("token",response.data.token)
      navigate('/dashboard')
      
      
      }
    } label={"Sign up"}/>
    <BottomWarning label={"Already A Registered User?"} buttonText="Click Here To Login" to='/signin'/>
    
</div>
    </div>
      
    </div>
  
}
