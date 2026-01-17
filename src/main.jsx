

import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
// REMOVED: import { AuthProvider } from './context/AuthContext' 

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* REMOVED: AuthProvider wrapper */}
    <App />
  </React.StrictMode>
)