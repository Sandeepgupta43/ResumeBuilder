import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import { CustomUserProvider } from './context/CustomUserContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <CustomUserProvider>
          <App />
        </CustomUserProvider>
      </UserProvider>
    </BrowserRouter>
    
  </StrictMode>
)
