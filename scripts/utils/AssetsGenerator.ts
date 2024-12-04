import path from 'path';
import fs from 'fs';
import { readJsonFile } from '../../src/shared/utils/fileUtils';

export type SpineAsset = {
  name: string;
  label: string;
  skeleton: string;
  atlas: string;
  defaultAnimation?: string;
};

export class AssetsGenerator {
  constructor(private assetsDir: string) {}

  private capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  generateAssetsList(): SpineAsset[] {
    const files = fs.readdirSync(this.assetsDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    return jsonFiles
      .filter(jsonFile => {
        const name = path.basename(jsonFile, '.json');
        return files.includes(`${name}.atlas`);
      })
      .map(jsonFile => {
        const name = path.basename(jsonFile, '.json');
        const jsonContent = readJsonFile(path.join(this.assetsDir, jsonFile));
        
        return {
          name,
          label: name.split('-').map(this.capitalizeFirstLetter).join(' '),
          skeleton: `/assets/${jsonFile}`,
          atlas: `/assets/${name}.atlas`,
          defaultAnimation: Object.keys(jsonContent.animations)[0] || 'idle'
        };
      });
  }

  generateTypeDefinition(): string {
    const assets = this.generateAssetsList();
    
    return `
// This file is auto-generated. Do not edit manually.
export type ViewerConfig = {
  containerId: string;
  width?: string;
  height?: string;
};

export type SpineAsset = {
  name: string;
  label: string;
  skeleton: string;
  atlas: string;
  defaultAnimation?: string;
};

export const SPINE_ASSETS: SpineAsset[] = ${JSON.stringify(assets, null, 2)};
`;
  }
} 