import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'mapbox-gl/dist/mapbox-gl.css';
import '../src/styles/default.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
