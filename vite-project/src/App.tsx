import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Hero from './components/hero/hero'
import Header from './components/header/header'
import Footer from './components/footer/footer'
import About  from "./components/about/about"
// nombrar las importaciones 
import './App.css'

function App() {

  return (
    <>
    <Router>
      {/* aparece de una vez sin necesidad de enrutarlo */}
      <Header/>
        <Routes>
          {/* se usa para hacer hipervinculos / botones */}
          <Route path="/Hero" element={<Hero />} />
          <Route path="/About" element={<About />} />
        </Routes>
      <Footer/>
    </Router>
    
    </>
  )
}

export default App
