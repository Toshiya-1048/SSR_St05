import { createRoot } from 'react-dom/client';
import React from 'react';
import App from '../shared/components/App';
import '../shared/styles/global.css';

// CSRモードでの初期化
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    React.createElement(App)
  );
} 