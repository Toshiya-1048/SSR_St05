// エラーハンドリング用の型定義
export type ErrorType = 'NETWORK' | 'TIMEOUT' | 'PLAYER' | 'ASSET' | 'UNKNOWN';

export interface AppError extends Error {
  type: ErrorType;
  originalError?: any;
}

// テンプレート用の型定義
export interface TemplateOptions {
  content?: string;
  scriptPath?: string;
}

// ビルド設定用の型定義
export interface BuildConfig {
  assetsDir: string;
  outputPath: string;
} 