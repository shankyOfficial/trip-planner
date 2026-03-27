import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import LoginPage from './LoginPage.jsx'

const isRemembered = () => {
  try {
    return (
      localStorage.getItem('itinerary-remember') === 'true' ||
      sessionStorage.getItem('itinerary-session') === 'true'
    )
  } catch (error) {
    return false
  }
}

function Router() {
  const [route, setRoute] = useState(window.location.pathname)

  useEffect(() => {
    const handlePop = () => setRoute(window.location.pathname)
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path)
      setRoute(path)
    }
  }

  useEffect(() => {
    if (route === '/') {
      navigate('/login')
      return
    }
    if (route === '/itinerary' && !isRemembered()) {
      navigate('/login')
    }
  }, [route])

  if (route === '/itinerary') {
    return <App />
  }

  return <LoginPage onLogin={() => navigate('/itinerary')} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
