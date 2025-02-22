import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppProvider from './Context/Context'

// Add this to your index.css or create a new style block
const styles = `
  :root {
    --primary-bg: #1a2332;
    --secondary-bg: #1e293b;
    --accent-color: #3b82f6;
    --accent-hover: #1e3a8a;
    --text-primary: #ffffff;
    --text-secondary: #94a3b8;
  }

  body {
    background-color: var(--primary-bg);
    color: var(--text-primary);
  }

  /* Custom scrollbar for webkit browsers */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--secondary-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent-color);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--accent-hover);
  }
`

// Add the styles to the document
const styleSheet = document.createElement('style')
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </StrictMode>
)