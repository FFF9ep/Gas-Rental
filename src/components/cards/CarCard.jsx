import React from 'react'
import { Link } from 'react-router-dom'

export default function CarCard({car}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <img src={car.images?.[0] || '/assets/images/pajero-1.png'} alt={car.name} className="w-full h-40 object-cover" />
      <div className="p-3">
        <div className="font-semibold">{car.name}</div>
        <div className="text-sm text-gray-500">{car.brand}</div>
        <div className="flex justify-between items-center mt-2">
          <div className="font-bold">Rp {car.pricePerDay.toLocaleString()}</div>
          <Link to={`/car/${car.id}`} className="text-sm text-primary">Detail</Link>
        </div>
      </div>
    </div>
  )
}
