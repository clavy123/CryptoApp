import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import Coin from './components/Coin'
import CoinDetail from './components/CoinDetail'
import Exchange from './components/Exchange'
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element ={<Home />} />
        <Route path='/coin' element ={<Coin />} />
        <Route path='/coin/:id' element ={<CoinDetail />} />
        <Route path='/exchange' element ={<Exchange />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
