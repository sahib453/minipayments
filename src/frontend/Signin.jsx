import Heading from './components/Heading'
import Inputbox from './components/Inputbox'
import Subheading from './components/Subheading'
import Button from './components/Button'
import BottomWarning  from './components/BottomWarning'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signin(){
    const [user,setUsername] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()
    return <div className='flex justify-center border bg-slate-300 h-screen'>
        <div className='flex flex-col justify-center'>
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max ">


    <Heading label={"Login"} />
    <Subheading label={'Enter your account details to login'}/>
    <Inputbox  label={'Username'} placeholder={'user2312'} onChange={(e)=>setUsername(e.target.value)}/>
    <Inputbox type={'password'} label={'Password'} placeholder={'password212@12'} onChange={(e)=>setPassword(e.target.value)}/>
    <Button label={'Sign In'} onClick={async()=>{
        const response = await axios.post('https://minipaymentbackend-api.vercel.app/user/login',{
            username:user,
            password
        })
        localStorage.setItem("token",response.data.token)
        navigate('/dashboard')
    }}/>
    <BottomWarning label={'Not a registered User?'} buttonText={'Click Here To Sign Up'} to={'/signup'} />
    </div>
    </div>

    </div>
}
