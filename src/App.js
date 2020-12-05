import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from "./router/AppRoute";
import './asset/sass/custom.scss'

function App() {
  return (
    <BrowserRouter>
    <AppRoute />
  </BrowserRouter>
  );
}

export default App;
