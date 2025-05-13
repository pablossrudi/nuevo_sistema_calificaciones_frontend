import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppRouter } from './AppRouter'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className='min-h-screen bg-linear-to-r from-white from-8% to-[#999999]'>
      <AppRouter />
    </div>
  </StrictMode>
)
