import express from 'express';
import path from 'path';
import { config } from '../../config';

export function setupStaticMiddleware(app: express.Application) {
  app.use(config.paths.public, express.static(path.resolve(__dirname, '../../../public/assets')));
  app.use(express.static(path.resolve(__dirname, `../../../${config.paths.dist.slice(1)}`)));
}