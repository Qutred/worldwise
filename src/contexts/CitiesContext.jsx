import React, {useState, useEffect, useContext, useReducer} from 'react'
import {createContext} from 'react'

const CityContext = createContext()

const BASE_URL = 'http://localhost:9000'

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'loading':
      return {...state, isLoading: true}
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case 'city/loaded':
      return {...state, isLoading: false, currentCity: action.payload}
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter(city => city.id !== action.payload),
        currentCity: {},
      }
    case 'rejected':
      return {...state, isLoading: false, error: action.payload}
    default:
      throw new Error('Unknown action type')
  }
}

const CitiesProvider = ({children}) => {
  const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(
    reducer,
    initialState
  )

  useEffect(() => {
    const fetchCities = async () => {
      try {
        dispatch({type: 'loading'})
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({type: 'cities/loaded', payload: data})
      } catch (e) {
        dispatch({type: 'rejected', payload: `Error loading data ${e.message}`})
      }
    }

    fetchCities()
  }, [])

  const getCity = async id => {
    if (Number(id) === currentCity.id) return
    try {
      dispatch({type: 'loading'})
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      dispatch({type: 'city/loaded', payload: data})
    } catch (e) {
      dispatch({type: 'rejected', payload: `Error loading city ${e.message}`})
    }
  }

  const createCity = async newCity => {
    try {
      dispatch({type: 'loading'})
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      dispatch({type: 'city/created', payload: data})
    } catch (e) {
      dispatch({type: 'rejected', payload: `Error creating city ${e.message}`})
    }
  }

  const deleteCity = async id => {
    try {
      dispatch({type: 'loading'})
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      })

      dispatch({type: 'city/deleted', payload: id})
    } catch (e) {
      dispatch({type: 'rejected', payload: `Error deleting city ${e.message}`})
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        deleteCity,
        createCity,
      }}>
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
