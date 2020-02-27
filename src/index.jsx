import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

window.addEventListener('DOMContentLoaded', () => {
  const $app = document.querySelector('.eavesdrop');
  ReactDOM.render(<App />, $app);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
