import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header() {
  const activeStyle = {
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#161616',
  }

  function fakeLogOut() {
    localStorage.removeItem('loggedin');
  }
  
  return (
    <header>
      <NavLink className="site-logo" to=".">#VanLife</NavLink>
      <nav>
        <NavLink to="host" className={({isActive}) => isActive ? activeStyle : null}>Host</NavLink>
        <NavLink to="about" className={({isActive}) => isActive ? activeStyle : null}>About</NavLink>
        <NavLink to="vans" className={({isActive}) => isActive ? activeStyle : null}>Vans</NavLink>
        {/* <NavLink to="login" className="login-link"><img src="/assets/images/avatar-icon.png" alt="login icon" className='login-icon' /></NavLink>
        <button onClick={fakeLogOut}>X</button> */}
      </nav>
    </header>
  )
}