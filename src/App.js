import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoute from "./router/AppRoute";
import {AuthProvider} from "./Auth";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
