import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../shared/components/App';

export function renderApp(): string {
  try {
    return ReactDOMServer.renderToString(
      React.createElement(App)
    );
  } catch (error) {
    console.error('SSR Error:', error);
    return '<div>Error rendering content</div>';
  }
}