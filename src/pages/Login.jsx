import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

export default function Login(){
  const { users, setAuth } = useContext(AppContext)
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const submit = e => {
    e.preventDefault()
    const user = users?.find(u=>u.email === email)
    if(user){
      setAuth(user)
      navigate('/')
    } else {
      alert('User not found. Use seeding emails from src/data/users.json')
    }
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit} className="space-y-3">
        <input type="email" placeholder="email" className="w-full p-2 border rounded" value={email} onChange={e=>setEmail(e.target.value)}/>
        <button className="w-full py-2 bg-primary text-white rounded">Login</button>
      </form>
    </main>
  )
}
