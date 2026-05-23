import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { ConsentProvider } from './consent/ConsentContext'
import { ThemeProvider } from './theme/ThemeProvider'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ConsentProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConsentProvider>
    </ThemeProvider>
  </StrictMode>,
)
