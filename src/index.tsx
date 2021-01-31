import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import './index.css';
const App = lazy(() => import('./App'));

const renderLoader = () => <p>Loading...</p>;

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={renderLoader()}>
      <Router>
        <App />
      </Router>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register("/service.js")
  })
}

