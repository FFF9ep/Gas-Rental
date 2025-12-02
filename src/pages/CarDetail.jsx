import React, { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AppContext } from '../context/AppProvider'

export default function CarDetail(){
  const { id } = useParams()
  const { cars } = useContext(AppContext)
  const car = cars?.find(c=>c.id===id)

  if(!car) return <div className="p-4">Car not found</div>

  return (
    <main className="p-4 max-w-3xl mx-auto">
      <img src={car.images?.[0]} alt={car.name} className="w-full h-56 object-cover rounded" />
      <h2 className="text-xl font-semibold mt-4">{car.name}</h2>
      <div className="text-sm text-gray-500">{car.brand}</div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="p-2 border rounded">Seats: {car.seats}</div>
        <div className="p-2 border rounded">Fuel: {car.fuel}</div>
        <div className="p-2 border rounded">Transmission: {car.transmission}</div>
        <div className="p-2 border rounded">Rp {car.pricePerDay.toLocaleString()}/day</div>
      </div>
      <div className="mt-4 flex gap-2">
        <Link to={`/car/${car.id}/booking`} className="px-4 py-2 bg-primary text-white rounded">Rent Now</Link>
        <button className="px-4 py-2 border rounded">Pick Up</button>
      </div>
    </main>
  )
}
