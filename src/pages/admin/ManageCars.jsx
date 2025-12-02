import React, { useContext, useState, useMemo } from 'react'
import { AppContext } from '../../context/AppProvider'
import Modal from '../../components/ui/Modal'
import ImageUploader from '../../components/ui/ImageUploader'
import { v4 as uuidv4 } from 'uuid'

function validateCar(car) {
  const errors = []
  if(!car.name || car.name.trim().length < 2) errors.push('Name is required (min 2 chars)')
  if(!car.brand) errors.push('Brand is required')
  if(!car.pricePerDay || car.pricePerDay <= 0) errors.push('Price per day must be > 0')
  return errors
}

export default function ManageCars(){
  const { cars = [], setCars } = useContext(AppContext)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 6
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(null)
  const [errors, setErrors] = useState([])
  const [lastDeleted, setLastDeleted] = useState(null)

  const filtered = useMemo(()=> {
    const q = query.toLowerCase().trim()
    return cars.filter(c=> !q || c.name.toLowerCase().includes(q) || c.brand.toLowerCase().includes(q))
  }, [cars, query])

  const totalPages = Math.max(1, Math.ceil((filtered.length||0)/perPage))
  const pageItems = filtered.slice((page-1)*perPage, page*perPage)

  const startAdd = () => {
    setForm({ id: `car-${Date.now()}`, name:'', brand:'', pricePerDay:0, seats:4, fuel:'Petrol', transmission:'Manual', images:[], availableRegions:['Jawa Tengah'] })
    setErrors([])
    setEditing(true)
  }
  const startEdit = (c) => {
    setForm({...c})
    setErrors([])
    setEditing(true)
  }
  const save = () => {
    const errs = validateCar(form)
    if(errs.length){ setErrors(errs); return }
    if(cars.find(c=>c.id===form.id)){
      setCars(cars.map(c=> c.id===form.id ? form : c))
    } else {
      setCars([form, ...cars])
    }
    setEditing(false)
  }
  const del = (id) => {
    const toDelete = cars.find(c=>c.id===id)
    if(!toDelete) return
    if(!confirm('Delete this car?')) return
    setCars(cars.filter(c=>c.id!==id))
    setLastDeleted(toDelete)
  }
  const undoDelete = () => {
    if(lastDeleted){
      setCars([lastDeleted, ...cars])
      setLastDeleted(null)
    }
  }

  return (
    <main className="p-4 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Manage Cars</h2>
        <div className="flex gap-2">
          <input placeholder="Search..." value={query} onChange={e=>{setQuery(e.target.value); setPage(1)}} className="p-2 border rounded" />
          <button onClick={startAdd} className="px-3 py-2 bg-primary text-white rounded">Add Car</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {pageItems.map(c=>(
          <div key={c.id} className="border rounded p-3 flex flex-col">
            <img src={c.images?.[0] || '/assets/images/pajero-1.png'} alt={c.name} className="w-full h-36 object-cover rounded" />
            <div className="mt-2 flex-1">
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-gray-500">{c.brand}</div>
              <div className="text-sm mt-1">Rp {c.pricePerDay?.toLocaleString()}</div>
            </div>
            <div className="flex gap-2 mt-3">
              <button onClick={()=>startEdit(c)} className="px-3 py-2 border rounded">Edit</button>
              <button onClick={()=>del(c.id)} className="px-3 py-2 border rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between items-center">
        <div>
          Page {page} / {totalPages}
        </div>
        <div className="flex gap-2">
          <button onClick={()=>setPage(p=>Math.max(1,p-1))} className="px-2 py-1 border rounded">Prev</button>
          <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} className="px-2 py-1 border rounded">Next</button>
        </div>
      </div>

      {lastDeleted && (
        <div className="fixed bottom-4 right-4 bg-white p-3 border rounded shadow-lg">
          <div>Deleted {lastDeleted.name}</div>
          <div className="flex gap-2 mt-2">
            <button onClick={undoDelete} className="px-2 py-1 border rounded">Undo</button>
            <button onClick={()=>setLastDeleted(null)} className="px-2 py-1 border rounded">Dismiss</button>
          </div>
        </div>
      )}

      <Modal open={editing} onClose={()=>setEditing(false)} title={form ? (cars.find(c=>c.id===form.id)?'Edit Car':'Add Car') : 'Car'}>
        {form && (
          <div className="space-y-2">
            <input className="w-full p-2 border rounded" placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
            <input className="w-full p-2 border rounded" placeholder="Brand" value={form.brand} onChange={e=>setForm(f=>({...f, brand:e.target.value}))}/>
            <input type="number" className="w-full p-2 border rounded" placeholder="Price per day" value={form.pricePerDay} onChange={e=>setForm(f=>({...f, pricePerDay:Number(e.target.value)}))}/>
            <input type="text" className="w-full p-2 border rounded" placeholder="Seats" value={form.seats} onChange={e=>setForm(f=>({...f, seats:Number(e.target.value)}))}/>
            <div>
              <label className="block text-sm">Images</label>
              <ImageUploader value={form.images} onChange={(imgs)=>setForm(f=>({...f, images: imgs}))} />
            </div>
            <div>
              <label className="block text-sm">Available Regions (comma separated)</label>
              <input className="w-full p-2 border rounded" value={form.availableRegions.join(', ')} onChange={e=>setForm(f=>({...f, availableRegions: e.target.value.split(',').map(s=>s.trim()).filter(Boolean)}))}/>
            </div>

            {errors.length>0 && <div className="text-sm text-red-600"><ul>{errors.map((er,i)=><li key={i}>{er}</li>)}</ul></div>}

            <div className="flex gap-2 mt-2">
              <button onClick={save} className="px-3 py-2 bg-primary text-white rounded">Save</button>
              <button onClick={()=>setEditing(false)} className="px-3 py-2 border rounded">Cancel</button>
            </div>
          </div>
        )}
      </Modal>
    </main>
  )
}
