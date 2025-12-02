import React, { useState } from 'react'

export default function ImageUploader({value = [], onChange}) {
  const [previews, setPreviews] = useState(value || [])

  const handle = (e) => {
    const files = Array.from(e.target.files || [])
    files.forEach(file => {
      const reader = new FileReader()
      reader.onload = () => {
        const next = [...previews, reader.result]
        setPreviews(next)
        onChange && onChange(next)
      }
      reader.readAsDataURL(file)
    })
  }

  const remove = (idx) => {
    const next = previews.filter((_,i)=>i!==idx)
    setPreviews(next)
    onChange && onChange(next)
  }

  return (
    <div>
      <input type="file" accept="image/*" multiple onChange={handle} />
      <div className="mt-2 flex gap-2 flex-wrap">
        {previews.map((p,i)=>(
          <div key={i} className="relative">
            <img src={p} alt={`preview-${i}`} className="w-28 h-20 object-cover rounded border" />
            <button onClick={()=>remove(i)} className="absolute -top-1 -right-1 bg-white rounded-full px-1">✕</button>
          </div>
        ))}
      </div>
    </div>
  )
}
