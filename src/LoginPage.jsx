import { useEffect, useState } from 'react'
import GlobeMap from './components/GlobeMap'
import './App.css'

const CREDENTIAL = 'shankydiya'
const REMEMBER_KEY = 'itinerary-remember'
const SESSION_KEY = 'itinerary-session'

const isRemembered = () => {
  try {
    return (
      localStorage.getItem(REMEMBER_KEY) === 'true' ||
      sessionStorage.getItem(SESSION_KEY) === 'true'
    )
  } catch (error) {
    return false
  }
}

export default function LoginPage({ onLogin }) {
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  useEffect(() => {
    if (isRemembered()) {
      onLogin?.()
    }
  }, [onLogin])

  const handleLoginSubmit = (event) => {
    event.preventDefault()
    if (loginForm.username === CREDENTIAL && loginForm.password === CREDENTIAL) {
      try {
        sessionStorage.setItem(SESSION_KEY, 'true')
        if (rememberMe) {
          localStorage.setItem(REMEMBER_KEY, 'true')
        } else {
          localStorage.removeItem(REMEMBER_KEY)
        }
      } catch (error) {
        // ignore storage errors
      }
      setLoginError('')
      onLogin?.()
      return
    }
    setLoginError('Invalid credentials. Please try again.')
  }

  const handleLoginChange = (field) => (event) => {
    setLoginForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  return (
    <div className="app">
      <section className="login-screen" style={{ '--hero-progress': 0 }}>
        <div className="hero__backdrop login-backdrop" aria-hidden="true"></div>
        <div className="hero__globe login-globe" aria-hidden="true">
          <GlobeMap progress={0.18} showRoute={false} />
        </div>
        <div className="login-card">
          <h1>Login</h1>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <label className="login-field">
              <span>Username</span>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={loginForm.username}
                onChange={handleLoginChange('username')}
                required
              />
            </label>
            <label className="login-field">
              <span>Password</span>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={loginForm.password}
                onChange={handleLoginChange('password')}
                required
              />
            </label>
            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(event) => setRememberMe(event.target.checked)}
              />
              Keep me signed in
            </label>
            {loginError ? <p className="login-error">{loginError}</p> : null}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
