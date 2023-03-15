import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../api';

export default function Login() {
  const [loginFormData, setLoginFormData] = React.useState({ email: "", password: ""});
  const location = useLocation();
  const [status, setStatus] = React.useState('idle');
  const [loginError, setLoginError] = React.useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setLoginError(null);
    loginUser(loginFormData)
      .then(data => {
        localStorage.setItem('loggedin', true);
        navigate("/host", { replace: true })
      })
      .catch(error => {
        console.error(error.message);
        setLoginError(error.message);
      })
    setStatus('idle')
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
      {loginError && <p>{loginError}</p>}
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
        <button 
          disabled={status === 'submitting'}
        >{status === 'submitting' ? "Logging in..." : "Log in"}</button>
      </form>
    </div>
  )
}