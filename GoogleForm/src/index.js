import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Appfirst from './Application';
import App from "./App"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appfirst />
    {/* <App/> */}
  </React.StrictMode>
);

