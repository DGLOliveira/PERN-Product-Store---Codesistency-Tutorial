import React from 'react'
import Navbar from './components/Navbar.component.jsx'
import HomePage from './pages/Home.page.jsx'
import ProductPage from './pages/Product.page.jsx'
import { Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </div>
  )
}

export default App