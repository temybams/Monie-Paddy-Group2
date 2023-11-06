import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component from App.tsx
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>,
  document.getElementById('root')
);
