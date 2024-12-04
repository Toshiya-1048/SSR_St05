import fs from 'fs';
import path from 'path';

export function readJsonFile(filePath: string) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch (error) {
    console.error(`Error reading JSON file ${filePath}:`, error);
    throw error;
  }
}

export function writeTypeDefinition(content: string, outputPath: string) {
  try {
    fs.writeFileSync(outputPath, content.trim());
    console.log(`Successfully wrote type definition to ${outputPath}`);
  } catch (error) {
    console.error('Error writing type definition:', error);
    throw error;
  }
} 