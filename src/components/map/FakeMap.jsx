import React from 'react'

export default function FakeMap({className}) {
  return (
    <div className={`relative ${className}`}>
      <img src="/assets/images/map-placeholder.png" alt="map" className="w-full h-64 object-cover rounded"/>
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <polyline points="40,220 120,180 200,140 300,120" fill="none" stroke="#ff8800" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="40" cy="220" r="8" fill="#1615FF" stroke="#fff" strokeWidth="2"/>
        <circle cx="300" cy="120" r="10" fill="#10B981" stroke="#fff" strokeWidth="2"/>
      </svg>
    </div>
  )
}
