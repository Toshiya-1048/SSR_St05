import { hydrateRoot } from 'react-dom/client';
import React from 'react';
import App from '../shared/components/App';
import '../shared/styles/global.css';

export function hydrateApp(): void {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    hydrateRoot(rootElement, React.createElement(App));
  }
}