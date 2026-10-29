import React from 'react';
import ReactDOM from 'react-dom/client';
import { BroswerRouter, Routes, Route, BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import Recipes from './pages/Recipes';
import reportWebVitals from './reportWebVitals';
import IngredientInput from './components/IngredientInput';
import Survey from "./components/Survey";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/Recipes" element={<Recipes />} />
      <Route path="/Survey" element={<Survey />} />
      <Route path="/IngredientInput" element={<IngredientInput />} />
    </Routes>
  </BrowserRouter>
);

/* root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
