import express from 'express';
import { setupMainRoutes } from './main';

export function setupRoutes(app: express.Application) {
  setupMainRoutes(app);
} 