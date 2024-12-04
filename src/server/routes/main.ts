import express from 'express';
import { generateHTML } from '../../shared/utils/template';
import { renderApp } from '../render';

export function setupMainRoutes(app: express.Application) {
  app.get('*', (req, res) => {
    const content = renderApp();
    res.send(generateHTML({ content }));
  });
} 