// returns pseudo deterministic distance 0..499
export const mockDistanceKm = (from, toId) => {
  const s = (from || '') + '|' + (toId || '')
  let sum = 0
  for(let i=0;i<s.length;i++) sum += s.charCodeAt(i)
  return sum % 500
}
export const isAvailable = ({province, fromAddress}, car) => {
  if(!province) return false
  if(!car?.availableRegions?.includes(province)) return false
  const dist = mockDistanceKm(fromAddress, car?.id)
  if(dist > 300) return false
  return true
}
