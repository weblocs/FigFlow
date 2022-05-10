import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Expenses from "./routes/expenses";
import Invoices from "./routes/invoices";
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
          <Route path="/" element={<App />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="invoices" element={<Invoices />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
);
