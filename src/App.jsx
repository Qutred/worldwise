import {useState, useEffect, lazy, Suspense} from 'react'
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom'

import './index.css'

const Login = lazy(() => import('./pages/Login'))
const Product = lazy(() => import('./pages/Product'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Homepage = lazy(() => import('./pages/Homepage'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const ProtectedRoute = lazy(() => import('./pages/ProtectedRoute'))

import SpinnerFullPage from './components/SpinnerFullPage'
import CityList from './components/CityList'
import CoutryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import {CitiesProvider} from './contexts/CitiesContext'
import {AuthProvider} from './contexts/FakeAuthContext'

const BASE_URL = 'http://localhost:9000'

const App = () => {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />
              <Route path='product' element={<Product />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='login' element={<Login />} />
              <Route
                path='app'
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }>
                <Route index element={<Navigate to='cities' replace />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CoutryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  )
}

export default App
