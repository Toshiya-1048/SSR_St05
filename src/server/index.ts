import { createApp } from './app';
import { config } from '../config';

const PORT = process.env.PORT || config.server.ports.ssr;
const app = createApp();

app.listen(PORT, () => {
  console.log(`
🚀 SSR Server is running!
🌐 URL: http://localhost:${PORT}

Press Ctrl + C to stop
  `);
}); 