import React, { createContext, useEffect, useState } from 'react'
import carsData from '../data/cars.json'
import usersData from '../data/users.json'
import txData from '../data/transactions.json'
import { load, save } from '../utils/storage'

export const AppContext = createContext(null)

export const AppProvider = ({children}) => {
  const [cars, setCars] = useState(()=> load('GR_cars', carsData))
  const [users, setUsers] = useState(()=> load('GR_users', usersData))
  const [transactions, setTransactions] = useState(()=> load('GR_tx', txData))
  const [auth, setAuth] = useState(()=> load('GR_auth', null))

  useEffect(()=> save('GR_cars', cars), [cars])
  useEffect(()=> save('GR_users', users), [users])
  useEffect(()=> save('GR_tx', transactions), [transactions])
  useEffect(()=> save('GR_auth', auth), [auth])

  return (
    <AppContext.Provider value={{
      cars, setCars, users, setUsers, transactions, setTransactions, auth, setAuth
    }}>
      {children}
    </AppContext.Provider>
  )
}
