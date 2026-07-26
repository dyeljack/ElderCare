import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Register from './components/register.jsx'
import Login from './components/login.jsx'
import Elderly from './components/Dashboards/ElderDashboard/Elderlydashboard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* <Register /> */}
    {/* <Login /> */}
    {/* <Elderly /> */}
  </StrictMode>,
)
