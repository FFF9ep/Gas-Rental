import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'
import { isAvailable } from '../utils/validators'
import { v4 as uuidv4 } from 'uuid'

export default function BookingWizard(){
  const { id } = useParams()
  const { cars, transactions, setTransactions, auth } = useContext(AppContext)
  const car = cars?.find(c=>c.id===id) || cars?.[0]
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [plan, setPlan] = useState({type:'Day Rent', days:1})
  const [form, setForm] = useState({name:auth?.name||'', address:'', province:'', gender:'L', ktpBase64:null})
  const [preview, setPreview] = useState(null)
  const [available, setAvailable] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(()=> {
    setAvailable(isAvailable({province: form.province, fromAddress: form.address}, car))
  }, [form.province, form.address, car])

  const handleFile = e => {
    const f = e.target.files?.[0]
    if(!f) return
    const r = new FileReader()
    r.onload = () => {
      setPreview(r.result)
      setForm(s=>({...s, ktpBase64: r.result}))
    }
    r.readAsDataURL(f)
  }

  const next = () => {
    setError(null)
    if(step===1) return setStep(2)
    if(step===2){
      if(!form.name || !form.address || !form.province) return setError('Lengkapi data')
      if(!isAvailable({province: form.province, fromAddress: form.address}, car)) {
        return setError('Not Available for selected location')
      }
      return setStep(3)
    }
  }
  const prev = () => setStep(s=>Math.max(1,s-1))

  const pay = async () => {
    setLoading(true)
    await new Promise(r=>setTimeout(r, 1200))
    const amount = (car.pricePerDay || 0) * (plan.days || 1)
    const tx = {
      id: `tx-${uuidv4()}`,
      userId: auth?.id || 'guest',
      carId: car.id,
      amount,
      status: 'paid',
      date: new Date().toISOString(),
      meta: { plan, customer: form }
    }
    const nextTx = [...(transactions||[]), tx]
    setTransactions(nextTx)
    setLoading(false)
    navigate(`/payment-success/${tx.id}`)
  }

  return (
    <main className="p-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold">Booking — {car?.name}</h3>
      <div className="mt-4">
        <div className="mb-3">
          <div className="flex gap-2">
            <button onClick={()=>setPlan({type:'Day Rent', days:1})} className={`px-3 py-2 rounded ${plan.type==='Day Rent'?'bg-primary text-white':'border'}`}>Day Rent</button>
            <button onClick={()=>setPlan({type:'Daily Rent', days:1})} className={`px-3 py-2 rounded ${plan.type==='Daily Rent'?'bg-primary text-white':'border'}`}>Daily Rent</button>
          </div>
        </div>

        {step===2 && (
          <div className="space-y-2">
            <input className="w-full p-2 border rounded" placeholder="Nama" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
            <input className="w-full p-2 border rounded" placeholder="Alamat" value={form.address} onChange={e=>setForm(f=>({...f, address:e.target.value}))}/>
            <select className="w-full p-2 border rounded" value={form.province} onChange={e=>setForm(f=>({...f, province:e.target.value}))}>
              <option value="">Pilih Provinsi</option>
              <option>Jawa Tengah</option>
              <option>Jawa Barat</option>
              <option>Jawa Timur</option>
              <option>Sumatera Utara</option>
            </select>
            <select className="w-full p-2 border rounded" value={form.gender} onChange={e=>setForm(f=>({...f, gender:e.target.value}))}>
              <option value="L">L</option>
              <option value="P">P</option>
            </select>
            <div>
              <label className="block text-sm">Upload KTP</label>
              <input type="file" accept="image/*" onChange={handleFile}/>
              {preview && <img src={preview} alt="ktp" className="mt-2 w-48 h-32 object-contain border rounded" />}
            </div>
            {!available && <div className="text-red-600">Not Available for selected location</div>}
          </div>
        )}

        {step===3 && (
          <div>
            <div className="p-3 border rounded">
              <div className="flex justify-between">
                <div>{car?.name}</div>
                <div className="font-semibold">Rp {((car?.pricePerDay||0)*(plan.days||1)).toLocaleString()}</div>
              </div>
              <div className="mt-3">
                <button onClick={pay} disabled={loading} className="w-full py-2 bg-primary text-white rounded">
                  {loading ? 'Processing...' : 'Pay'}
                </button>
              </div>
            </div>
          </div>
        )}

        {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

        <div className="flex gap-2 mt-4">
          {step>1 && <button onClick={prev} className="px-3 py-2 border rounded">Back</button>}
          {step<3 && <button onClick={next} className="ml-auto px-3 py-2 bg-primary text-white rounded">Next</button>}
        </div>
      </div>
    </main>
  )
}
