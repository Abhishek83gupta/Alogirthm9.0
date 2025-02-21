import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // children: [
      // {
      //   path: "/",
      //   element:
      // },
      // {
      //   path: "/login",
      //   element: 
      // },
      // {
      //   path: "/Signup",
      //   element: 
      // },
      // {
      //   path: "/seller/profile",
      //   element: 
      // },
      // {
      //   path: "/buyer/profile",
      //   element: 
      // },
    // ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
