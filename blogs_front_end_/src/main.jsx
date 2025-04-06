import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BlogsPage from './BlogsPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BlogsPage />
  </StrictMode>,
)
