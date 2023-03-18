import React from 'react'
import { useLocation, useNavigate, Form, useActionData, useNavigation } from 'react-router-dom'
import { loginUser } from '../api';

export async function loginAction({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  try {
    const data = await loginUser({email, password});
    localStorage.setItem('loggedin', true);
    return data;
  } catch(err) {
    return {
      error: err.message
    }
  }
}

export default function Login() {
  // const [loginFormData, setLoginFormData] = React.useState({ email: "", password: ""});
  // const [status, setStatus] = React.useState('idle');
  // const [loginError, setLoginError] = React.useState(null);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   setStatus('submitting');
  //   setLoginError(null);
  //   loginUser(loginFormData)
  //     .then(data => {
  //       localStorage.setItem('loggedin', true);
  //       navigate(from, { replace: true })
  //     })
  //     .catch(error => {
  //       console.error(error.message);
  //       setLoginError(error.message);
  //     })
  //   setStatus('idle')
  // }

  // function handleChange(e) {
  //   const { name, value } = e.target;
  //   setLoginFormData(prev => ({
  //     ...prev,
  //     [name] : value
  //   }))
  // }

  const data = useActionData();
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  // check next url saved location from authRequired if doesn't exist default to host
  const from = location.state?.from || "/host";

  if(data?.token) {
    navigate(from, { replace: true });
  }

  return (
    <div className='login-container'>
      {location?.state?.message && <h3 className='login-first'>{location.state.message}</h3>}
      <h1>Sign in to your account</h1>
      {data?.error && <p>{data.error}</p>}
      <Form className="login-form" action='/login' method='post'>
        <input
          type="email"
          // onChange={handleChange}
          name="email"
          placeholder='Email address'
          // value={loginFormData.email}
        />
        <input
          type="password"
          // onChange={handleChange}
          name="password"
          placeholder='password'
          // value={loginFormData.password}  
        />
        <button 
          disabled={navigation.state === 'submitting'}
        >{navigation.state === 'submitting' ? "Logging in..." : "Log in"}</button>
      </Form>
    </div>
  )
}