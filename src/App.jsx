import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

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
import Form from './components/Form'
import {CitiesProvider} from './contexts/CitiesContext'

const BASE_URL = 'http://localhost:9000'

const App = () => {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='product' element={<Product />} />
          <Route path='pricing' element={<Pricing />} />
          <Route path='app' element={<AppLayout />}>
            <Route index element={<Navigate to='cities' replace />} />
            <Route path='cities' element={<CityList />} />
            <Route path='cities/:id' element={<City />} />
            <Route path='countries' element={<CoutryList />} />
            <Route path='form' element={<Form />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  )
}

export default App
