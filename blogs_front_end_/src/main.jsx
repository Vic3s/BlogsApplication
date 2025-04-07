import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BlogsPage from './BlogsPage.jsx'
import CreatePage from './CreatePage.jsx'
import AccountPage from './AccountPage.jsx'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

const router = createBrowserRouter([{path: "/", element: <BlogsPage/>,
}, {path: "/create", element: <CreatePage/>}, {path: "/account", element: <AccountPage/>}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
