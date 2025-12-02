import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

export default function PaymentSuccess(){
  const { id } = useParams()
  const { transactions } = useContext(AppContext)
  const tx = transactions?.find(t=>t.id===id)
  const navigate = useNavigate()

  const share = async () => {
    if(navigator.share){
      await navigator.share({ title:'Booking Success', text:`Booking ${tx?.id} berhasil`, url: location.href })
    } else {
      navigator.clipboard.writeText(location.href)
      alert('Link copied')
    }
  }

  if(!tx) return <div className="p-4">Transaction not found</div>

  return (
    <main className="p-4 max-w-md mx-auto text-center">
      <div className="py-8">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-50 text-green-700 mx-auto">✔</div>
        <h2 className="text-2xl font-bold mt-4">Payment Successful</h2>
        <p className="text-gray-500 mt-2">Booking ID: {tx.id}</p>
        <div className="mt-6 space-y-2">
          <button onClick={share} className="w-full py-2 border rounded">Share</button>
          <button onClick={()=>navigate('/history')} className="w-full py-2 bg-primary text-white rounded">View History</button>
        </div>
      </div>
    </main>
  )
}
