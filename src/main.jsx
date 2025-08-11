import { install } from '@twind/core';
import config from '../twind.config.js';

install(config)

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
