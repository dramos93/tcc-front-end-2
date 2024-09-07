// import React from 'react';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';

// // const container = document.getElementById('root');
// // const root = createRoot(container!); // createRoot(container!) if you use TypeScript

// root.render(
//   <React.StrictMode>
//     <BrowserRouter basename="/">
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import App from './App';
import {createRoot} from "react-dom/client"
import { BrowserRouter } from 'react-router-dom';


// Use traditional DOM manipulation to create a root element for React
// document.body.innerHTML = '<div id="app"></div>'

// Create a root element for React
const app = createRoot(document.getElementById("root")!)
// Render our HelloWorld component
app.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <App />
    </BrowserRouter>
  </React.StrictMode>
  // <div>Olá, mundo.</div>

)
