import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Product from './pages/Product'
import Pricing from './pages/Pricing'
import Homepage from './pages/Homepage'
import PageNotFound from './pages/PageNotFound'
import './index.css'
import AppLayout from './pages/AppLayout'
import CityList from './components/CityList'
import {useState, useEffect} from 'react'
import CoutryList from './components/CountryList'
import City from './components/City'

const BASE_URL = 'http://localhost:9000'

const App = () => {
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
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='product' element={<Product />} />
        <Route path='pricing' element={<Pricing />} />
        <Route path='app' element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='cities'
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='cities/:id'
            element={<City cities={cities} isLoading={isLoading} />}
          />
          <Route
            path='countries'
            element={<CoutryList cities={cities} isLoading={isLoading} />}
          />
          <Route path='forms' element={<p>Forms</p>} />
        </Route>
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
