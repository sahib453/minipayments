import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Profile from './Profile'

export default function Users(){
    const [filter, setFilter] = useState("")
    const [users, setUsers] = useState([])
    const [loggedInUsername, setLoggedInUsername] = useState("")

    useEffect(() => {
        const fetchLoggedInUsername = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return;

                const response = await axios.get('https://minipaymentbackend-api.vercel.app/me', {
                    headers: { authorization: token }
                })
                setLoggedInUsername(response.data.username)
            } catch (error) {
                console.error('Error fetching logged-in user:', error)
            }
        }

        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://minipaymentbackend-api.vercel.app/bulk?filter=' + filter)
                const filteredUsers = response.data.users.filter(user => user.username !== loggedInUsername)
                setUsers(filteredUsers)
            } catch (err) {
                console.error('Error fetching users:', err)
            }
        }

        fetchLoggedInUsername()
        fetchUsers()
    }, [filter, loggedInUsername])

    return (
        <div>
            <div className='font-bold mt-6 text-xl'>Users</div>
            <div className='my-2'>
                <input
                    className='border round border-slate-300 px-2 py-1 w-full'
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}
            </div>
        </div>
    )
}

function User({ user }) {
    const navigate = useNavigate()
    return (
        <div className='flex ml-2 justify-between'>
            <div className='flex'>
                <Profile name={user.name} />
                <div className='mt-3'>{user.name}</div>
            </div>
            <div className='mr-4'>
                <Button onClick={() => navigate(`/send?id=${user._id}&name=${user.name}`)} label={"Send Money"} />
            </div>
        </div>
    )
}
