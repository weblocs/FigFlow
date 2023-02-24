import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Dashboard from './routes/dashboard'
import Design from './routes/design'
import Login from './routes/login'
import { store } from './app/store'
import { Provider } from 'react-redux'

import './styles/styles.scss'
import './styles/utility-classes.scss'

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="design/:projectSlug" element={<Design />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
