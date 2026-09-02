import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Drei from './pages/drei/Drei.jsx'
import { Leva } from 'leva'

createRoot(document.getElementById('root')).render(
     <StrictMode>
        <Leva collapsed hidden/>
        <App />
     </StrictMode>
  
)
