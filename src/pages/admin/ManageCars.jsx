import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { v4 as uuidv4 } from 'uuid'

export default function ManageCars(){
  const { cars, setCars } = useContext(AppContext)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({id:'', name:'', brand:'', pricePerDay:0, seats:4, fuel:'Petrol', transmission:'Manual', images:[], availableRegions:['Jawa Tengah']})

  const startAdd = () => { setEditing('add'); setForm({id:`car-${Date.now()}`, name:'', brand:'', pricePerDay:0, seats:4, fuel:'Petrol', transmission:'Manual', images:[], availableRegions:['Jawa Tengah']}) }
  const startEdit = (c) => { setEditing('edit'); setForm({...c}) }
  const save = () => {
    if(editing==='add'){
      setCars([...(cars||[]), form])
    } else {
      setCars(cars.map(c => c.id === form.id ? form : c))
    }
    setEditing(null)
  }
  const del = id => {
    if(confirm('Delete?')) setCars(cars.filter(c=>c.id!==id))
  }

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Manage Cars</h2>
      <div className="mb-4">
        <button onClick={startAdd} className="px-3 py-2 bg-primary text-white rounded">Add Car</button>
      </div>

      {editing && (
        <div className="p-3 border rounded mb-4 space-y-2">
          <input className="w-full p-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
          <input className="w-full p-2 border rounded" placeholder="Brand" value={form.brand} onChange={e=>setForm(f=>({...f, brand:e.target.value}))}/>
          <input type="number" className="w-full p-2 border rounded" placeholder="Price per day" value={form.pricePerDay} onChange={e=>setForm(f=>({...f, pricePerDay:Number(e.target.value)}))}/>
          <div className="flex gap-2">
            <button onClick={save} className="px-3 py-2 bg-primary text-white rounded">Save</button>
            <button onClick={()=>setEditing(null)} className="px-3 py-2 border rounded">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {(cars||[]).map(c=>(
          <div key={c.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-500">{c.brand}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>startEdit(c)} className="px-2 py-1 border rounded">Edit</button>
              <button onClick={()=>del(c.id)} className="px-2 py-1 border rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
