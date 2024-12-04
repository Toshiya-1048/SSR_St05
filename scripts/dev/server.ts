import { exec } from 'child_process';
import { promisify } from 'util';
import { ServerMode, ServerInfo } from '../../src/shared/types/server';
import { config } from '../../src/config';

const execAsync = promisify(exec);

async function startServers(mode: ServerMode = 'both') {
  try {
    console.log('Generating assets...\n');
    await execAsync('npm run build:assets');

    console.log('Starting development servers...\n');

    let servers: ServerInfo[] = [];
    
    if (mode === 'csr' || mode === 'both') {
      const csrServer = exec('npm run dev:csr');
      csrServer.stdout?.pipe(process.stdout);
      csrServer.stderr?.pipe(process.stderr);
      servers.push({ name: 'CSR', process: csrServer, url: `http://localhost:${config.server.ports.csr}` });
    }

    if (mode === 'ssr' || mode === 'both') {
      const ssrServer = exec('npm run dev:ssr');
      ssrServer.stdout?.pipe(process.stdout);
      ssrServer.stderr?.pipe(process.stderr);
      servers.push({ name: 'SSR', process: ssrServer, url: `http://localhost:${config.server.ports.ssr}` });
    }

    // サーバー情報の表示
    console.log('\n🚀 Development servers started!\n');
    servers.forEach(server => {
      console.log(`${server.name} Server: ${server.url}`);
    });
    console.log('\nPress Ctrl + C to stop all servers\n');

    // 終了処理
    process.on('SIGINT', () => {
      console.log('\nShutting down servers...');
      servers.forEach(server => server.process.kill());
      process.exit(0);
    });

  } catch (error) {
    console.error('Error starting servers:', error);
    process.exit(1);
  }
}

// コマンドライン引数からモードを取得
const mode = process.argv[2] as ServerMode || 'both';
startServers(mode);