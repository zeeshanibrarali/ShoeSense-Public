// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from "react-router-dom";
import './index.css';
import router from './routes';
import { AuthProvider } from './context/auth';
import { CartProvider } from './context/cart';
// import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <React.StrictMode>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>,
    </React.StrictMode>
  </>
);
