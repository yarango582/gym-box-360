import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  RouterProvider,
} from "react-router-dom"
import './index.css'
import router from './Router';
import { ToastContainer } from 'react-toast';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer position='top-center'/>
  </React.StrictMode>,
)
