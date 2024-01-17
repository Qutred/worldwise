import React, {useState, useEffect, useContext} from 'react'
import {createContext} from 'react'

const CityContext = createContext()

const BASE_URL = 'http://localhost:9000'

const CitiesProvider = ({children}) => {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (e) {
        console.log(`Error loading data ${e.message}`)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  return (
    <CityContext.Provider value={{cities, isLoading}}>
      {children}
    </CityContext.Provider>
  )
}

const useCities = () => {
  const context = useContext(CityContext)

  if (context === undefined)
    throw new Error('CitiesContext was used outside CitiesProvider')
  return context
}

export {CitiesProvider, useCities}
