// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
import { SearchProvider } from "./context/search";
import { CartProvider } from "./context/cart";
import "antd/dist/reset.css";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <SearchProvider>
      <CartProvider>
        <Toaster/>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SearchProvider>
  </AuthProvider>
);

