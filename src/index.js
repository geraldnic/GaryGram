import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from './components/NavbarComp'



ReactDOM.render(
  <React.StrictMode>
      <NavbarComp />
  </React.StrictMode>,
  document.getElementById('root')
);

