import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { UserProvider } from './context/UserContext.jsx'
import { CustomUserProvider } from './context/CustomUserContext.jsx'
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <UserProvider>
        <CustomUserProvider>
          <Toaster position="bottom-right" />
          <App />
        </CustomUserProvider>
      </UserProvider>
    </Router>

  </StrictMode>
)
