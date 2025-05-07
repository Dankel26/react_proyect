// import { useState} from 'react' --> funciones automaticas

import './header.css'
import { Link } from 'react-router-dom'
// la estructura base de la funcion y su nombre es importante para llamar desde app
function header() {
    

  return (
    <>
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          MyStore
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/Hero">Inicio</Link>
            </li>
            <li className="nav-item">
             <Link to="/About">Nosotros</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default header