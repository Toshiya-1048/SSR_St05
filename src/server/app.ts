import express from 'express';
import path from 'path';
import { setupMiddleware } from './middleware';
import { setupRoutes } from './routes';

export function createApp() {
  const app = express();
  
  // ミドルウェアのセットアップ
  setupMiddleware(app);
  
  // ルートのセットアップ
  setupRoutes(app);
  
  return app;
} 