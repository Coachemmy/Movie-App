import React from 'react'
import ScrollToTop from './components/ScrollToTop.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SplashPage from './pages/SplashPage.js'
import Home from './pages/Home.js'
import { MovieListProvider } from './context/MovieListContext.js'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <MovieListProvider>
        <Toaster position='top-center' reverseOrder={false} />
        <Routes>
          <Route path='/' element={<SplashPage />} />
          <Route path='/home' element={<Home />} />
        </Routes>
      </MovieListProvider>
    </Router>
  )
}

export default App
