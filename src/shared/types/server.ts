import { ChildProcess } from 'child_process';

// サーバーモードの型定義
export type ServerMode = 'csr' | 'ssr' | 'both';

// サーバー情報の型定義
export interface ServerInfo {
  name: string;
  process: ChildProcess;
  url: string;
} 