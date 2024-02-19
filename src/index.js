import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Routing from './Routing'
import MapWithPlaceholder from './components/mapwithrouting/MapWithRouting';
import reportWebVitals from './reportWebVitals';
import SimpleMap from "./SimpleMap";
import Location from "./Location"
import Giardino from "./GiardinoHome"
import PaginaUlivo from "./PaginaUlivo"


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <div>
        <PaginaUlivo />
      </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
