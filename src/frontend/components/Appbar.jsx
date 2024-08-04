import Profile from "./Profile";
import Button from "./Button"
import { useNavigate }from "react-router-dom";

export default function Appbar({label,name}){
    const navigate = useNavigate();
    return <div className="flex justify-between border-b-2 shadow-sm px-6 py-4 h-14">
        <div className="flex flex-col ml-4 font-semibold">{label}</div>

        <div className="flex items-center">
            <div className="mr-1 font-semibold">Hello </div>
            <Profile name={name}/>
            <Button label={"Logout"} onClick={()=>{
                localStorage.removeItem('token');
                navigate('/signin')
            }}></Button>
            </div>
    </div>
}

