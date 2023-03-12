import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({ email: "", password: ""});
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData(prev => ({
      ...prev,
      [name] : value
    }))
  }

  return (
    <div className='login-container'>
      {location?.state?.message && <h3 className='login-first'>{location.state.message}</h3>}
      <h1>Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          onChange={handleChange}
          name="email"
          placeholder='Email address'
          value={loginFormData.email}
        />
        <input
          type="password"
          onChange={handleChange}
          name="password"
          placeholder='password'
          value={loginFormData.password}  
        />
        <button>Log in</button>
      </form>
    </div>
  )
}