import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'

export default function History(){
  const { transactions, cars } = useContext(AppContext)
  const findCar = id => cars?.find(c=>c.id===id)
  return (
    <main className="p-4 max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">History</h2>
      <div className="space-y-3">
        {(transactions||[]).slice().reverse().map(tx => (
          <div key={tx.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{findCar(tx.carId)?.name || tx.carId}</div>
              <div className="text-sm text-gray-500">Rp {tx.amount.toLocaleString()} · {new Date(tx.date).toLocaleString()}</div>
            </div>
            <div className="text-sm">{tx.status}</div>
          </div>
        ))}
      </div>
    </main>
  )
}
