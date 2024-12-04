import { errorMiddleware } from './error';
import { setupStaticMiddleware } from './static';
import express from 'express';

export function setupMiddleware(app: express.Application) {
  setupStaticMiddleware(app);
  app.use(errorMiddleware);
}
