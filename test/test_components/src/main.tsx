import React from 'react'
import { Route, Routes, BrowserRouter, } from "react-router-dom";
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import "../../../scss/app.scss"


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
