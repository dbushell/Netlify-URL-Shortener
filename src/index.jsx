import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

window.addEventListener('DOMContentLoaded', () => {
  const $app = document.querySelector('#app');
  ReactDOM.render(<App />, $app);
});
