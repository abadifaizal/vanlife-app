import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <NavLink className="site-logo" to="/">#VanLife</NavLink>
      <nav>
        <NavLink to="/host" className={({isActive}) => isActive ? 'current' : null}>Host</NavLink>
        <NavLink to="/about" className={({isActive}) => isActive ? 'current' : null}>About</NavLink>
        <NavLink to="/vans" className={({isActive}) => isActive ? 'current' : null}>Vans</NavLink>
      </nav>
    </header>
  )
}