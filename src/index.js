import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import ServiceWorkerController from './components/ServiceWorkerController';

ReactDOM.render(<ServiceWorkerController><App /></ServiceWorkerController>, document.getElementById('root'));
