import { ErrorHandler } from '../../shared/utils/errorHandler';
import { generateHTML } from '../../shared/utils/template';
import { Request, Response, NextFunction } from 'express';

export function errorMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  const error = ErrorHandler.createError(err.message, 'UNKNOWN', err);
  ErrorHandler.logError(error);
  
  const errorContent = `
    <div class="error-message">
      ${ErrorHandler.getErrorMessage(error)}
    </div>
  `;
  
  res.status(500).send(generateHTML({ content: errorContent }));
}