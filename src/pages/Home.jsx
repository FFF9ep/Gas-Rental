import React, { useContext } from 'react'
import { AppContext } from '../context/AppProvider'
import CarCard from '../components/cards/CarCard'
import { Link } from 'react-router-dom'

export default function Home(){
  const { cars } = useContext(AppContext)
  return (
    <main className="p-4 max-w-3xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Gas Rental</h1>
        <p className="text-sm text-gray-500">Sewa mobil mudah & cepat</p>
      </header>

      <section className="mb-4">
        <input placeholder="Search cars..." className="w-full p-2 border rounded" />
      </section>

      <section className="grid grid-cols-1 gap-4">
        {(cars||[]).map(c => (
          <div key={c.id} className="">
            <CarCard car={c} />
            <div className="flex gap-2 mt-2">
              <Link to={`/car/${c.id}/booking`} className="px-3 py-2 bg-primary text-white rounded">Rent Now</Link>
            </div>
          </div>
        ))}
      </section>
      <footer className="mt-8 text-sm text-gray-500">Demo app — frontend only</footer>
    </main>
  )
}
