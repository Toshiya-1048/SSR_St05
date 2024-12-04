import { TemplateOptions } from '../types';
import { config } from '../../config';

interface AssetPaths {
  js: string[];
  css: string[];
}

const COMMON_ASSETS: AssetPaths = config.assets;

export function generateHTML({ content = '', scriptPath = config.paths.client }: TemplateOptions = {}): string {
  const cssLinks = COMMON_ASSETS.css
    .map(href => `<link rel="stylesheet" href="${href}">`)
    .join('\n');
    
  const jsScripts = COMMON_ASSETS.js
    .map(src => `<script src="${src}"></script>`)
    .join('\n');

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Spine Animation Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${cssLinks}
        ${jsScripts}
      </head>
      <body>
        <div id="root">${content}</div>
        <script type="module" src="${scriptPath}"></script>
      </body>
    </html>
  `.trim();
} 