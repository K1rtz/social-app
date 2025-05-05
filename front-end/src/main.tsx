import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { ProfilePopupProvider } from './context/PopupProfileContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AuthContextProvider>
      <ProfilePopupProvider>
      <App />
      </ProfilePopupProvider>
    </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
