export const load = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch(e){ return fallback }
}
export const save = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch(e){}
}
export const clearKey = (key) => localStorage.removeItem(key)
