import React from 'react'
export default function Card({children, className=''}) {
  return <div className={`p-4 border rounded-lg bg-white ${className}`}>{children}</div>
}
