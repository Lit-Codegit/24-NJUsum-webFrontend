import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom"
import './index.css'

const root = ReactDOM.createRoot(document.querySelector("#root"))

root.render(
  // history 路由模式
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
