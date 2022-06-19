import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";


import Dashboard from "./routes/dashboard";
import Design from "./routes/design";
import Create from "./routes/create";
import Login from "./routes/login";
import { store } from './app/store'
import { Provider } from 'react-redux'

import "./styles/styles.css";
import "./styles/panel-styles.css";
import "./styles/panel-extra-styles.css";


const rootElement = document.getElementById("root");
const root = createRoot(rootElement);
root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="design/:projectSlug" element={<Design />} />
          <Route path="create/:projectSlug" element={<Create />} />
          
          
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
