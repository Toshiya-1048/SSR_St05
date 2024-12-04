import { ErrorType, AppError } from '../types';

class ErrorHandler {
  static createError(message: string, type: ErrorType, originalError?: any): AppError {
    const error = new Error(message) as AppError;
    error.type = type;
    error.originalError = originalError;
    return error;
  }

  static getErrorMessage(error: AppError): string {
    switch (error.type) {
      case 'NETWORK':
        return 'ネットワークエラーが発生しました。接続を確認してください。';
      case 'TIMEOUT':
        return 'タイムアウトが発生しました。再度お試しください。';
      case 'PLAYER':
        return 'プレイヤーの初期化に失敗しました。ページを更新してください。';
      case 'ASSET':
        return 'アセットの読み込みに失敗しました。別のアセットを試してください。';
      default:
        return '予期せぬエラーが発生しました。';
    }
  }

  static logError(error: AppError): void {
    console.error(`[${error.type}] ${error.message}`, error.originalError || '');
  }
}

export { ErrorHandler };
export type { AppError, ErrorType }; 