import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { RouterProvider } from 'react-router'
import { allRoutes } from './routes/allRoutes.jsx'
import { RecoilRoot } from 'recoil'


createRoot(document.getElementById('root')).render(
  <RecoilRoot>
    <RouterProvider router={allRoutes}>
      <App />
    </RouterProvider>
  </RecoilRoot>
)
