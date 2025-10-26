/**
 * This file will run prettier on the file that has @formatter Prettier in it
 */
const fs = require('fs');
const { execSync } = require('child_process');

const filePath = process.argv[2];
const content = fs.readFileSync(filePath, 'utf-8');

if (content.includes('@formatter Prettier')) {
  try {
    execSync(`composer run format "${filePath}"`);
  } catch (err) {
    console.error('Error running Prettier formatter on PHP file:', err);
  }
}
